'use client';

import { useEffect, useState } from 'react';
import {
  getCertificadoDigital,
  setCertificadoDigital,
  type CertificadoDigitalItem,
} from '@/lib/firestore';
import { initFirebase } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

function ItemListEditor({
  items,
  onChange,
  placeholder,
  emptyMessage,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  emptyMessage: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const updated = [...items];
              updated[index] = e.target.value;
              onChange(updated);
            }}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            className="text-sm text-red-600 hover:underline px-2"
          >
            Remover
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-cdl-gray-text italic py-4 text-center border border-dashed border-gray-300 rounded-lg">
          {emptyMessage}
        </p>
      )}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="text-sm text-cdl-blue hover:underline font-medium"
      >
        + Adicionar item
      </button>
    </div>
  );
}

export default function AdminCertificadoDigitalPage() {
  const [data, setData] = useState<CertificadoDigitalItem>({
    title: '',
    description: '',
    photo: null,
    howItWorksTitle: '',
    howItWorksIntro: '',
    howItWorksItems: [],
    benefitTitle: '',
    benefitDescription: '',
    docsTitle: '',
    docsPfTitle: '',
    docsPfItems: [],
    docsPjTitle: '',
    docsPjItems: [],
    docsPjNote: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCertificadoDigital()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function uploadImageFile(file?: File | null) {
    if (!file) return;
    setImageError('');
    setImageUploading(true);
    try {
      if (!IMGBB_KEY) {
        setImageError('Chave de upload não configurada');
        return;
      }
      async function compressImage(input: File, maxDim = 1600, quality = 0.75): Promise<Blob | null> {
        try {
          const bitmap = await createImageBitmap(input);
          const { width, height } = bitmap;
          let targetWidth = width;
          let targetHeight = height;
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            targetWidth = Math.round(width * ratio);
            targetHeight = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return null;
          ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
          return await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) return resolve(blob);
              canvas.toBlob((b) => resolve(b), 'image/jpeg', quality);
            }, 'image/webp', quality);
          });
        } catch {
          return await new Promise<Blob | null>((resolve) => {
            const img = new Image();
            img.onload = () => {
              let w = img.width;
              let h = img.height;
              if (w > maxDim || h > maxDim) {
                const r = Math.min(maxDim / w, maxDim / h);
                w = Math.round(w * r);
                h = Math.round(h * r);
              }
              const canvas = document.createElement('canvas');
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext('2d');
              if (!ctx) return resolve(null);
              ctx.drawImage(img, 0, 0, w, h);
              canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
            };
            img.onerror = () => resolve(null);
            img.src = URL.createObjectURL(input);
          });
        }
      }

      const compressed = await compressImage(file, 1600, 0.75);
      const toUpload = compressed && compressed.size > 0 ? compressed : file;
      const form = new FormData();
      if (toUpload instanceof Blob && !(toUpload instanceof File)) {
        form.append('image', toUpload, file.name.replace(/\.[^/.]+$/, '') + '.jpg');
      } else {
        form.append('image', toUpload as File);
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: 'POST',
        body: form,
      });
      const result = await res.json();
      if (result?.data?.url) {
        setData((d) => ({ ...d, photo: result.data.url }));
      } else {
        setImageError('Erro ao enviar imagem');
      }
    } catch {
      setImageError('Erro ao enviar imagem');
    } finally {
      setImageUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      initFirebase();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setError('Você precisa estar logado como administrador');
        return;
      }
      const idTokenResult = await user.getIdTokenResult();
      const isClaimAdmin = !!(idTokenResult.claims && idTokenResult.claims.admin);
      if (!isClaimAdmin) {
        const db = getFirestore();
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (!adminDoc.exists()) {
          setError('Acesso não autorizado');
          return;
        }
      }

      await setCertificadoDigital(data);
      alert('Salvo com sucesso!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Certificado Digital</h1>
      <p className="mt-2 text-sm text-cdl-gray-text">
        Edite o conteúdo da página do Certificado Digital
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-8 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={data.title}
            onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Certificado Digital"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Foto de destaque</label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImageFile(file);
              }}
              disabled={imageUploading}
              className="block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cdl-blue file:text-white hover:file:bg-cdl-blue-dark file:cursor-pointer"
            />
            {imageUploading && <span className="text-sm text-cdl-gray-text">Enviando...</span>}
            {imageError && <span className="text-sm text-red-600">{imageError}</span>}
          </div>
          {data.photo && (
            <div className="mt-4">
              <img src={data.photo} alt="Preview" className="max-w-md h-auto rounded-lg border border-gray-300" />
              <button
                type="button"
                onClick={() => setData((d) => ({ ...d, photo: null }))}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Remover foto
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            required
            value={data.description}
            onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Obtenha facilidade e agilidade na emissão..."
          />
        </div>

        <div className="p-4 bg-cdl-gray rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seção: Como funciona</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={data.howItWorksTitle}
                onChange={(e) => setData((d) => ({ ...d, howItWorksTitle: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Como funciona"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Texto introdutório</label>
              <textarea
                value={data.howItWorksIntro}
                onChange={(e) => setData((d) => ({ ...d, howItWorksIntro: e.target.value }))}
                rows={2}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Você pode realizar o processo de forma rápida..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Itens (ex: Online com CNH, Presencialmente)</label>
              <ItemListEditor
                items={data.howItWorksItems}
                onChange={(items) => setData((d) => ({ ...d, howItWorksItems: items }))}
                placeholder="Ex: Online com CNH: Faça tudo pela internet..."
                emptyMessage="Nenhum item. Clique em Adicionar item."
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-cdl-gray rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seção: Benefício para Associados</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={data.benefitTitle}
                onChange={(e) => setData((d) => ({ ...d, benefitTitle: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Benefício para Associados"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={data.benefitDescription}
                onChange={(e) => setData((d) => ({ ...d, benefitDescription: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Associados da CDL têm valor reduzido..."
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-cdl-gray rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seção: Documentos necessários</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título principal</label>
              <input
                type="text"
                value={data.docsTitle}
                onChange={(e) => setData((d) => ({ ...d, docsTitle: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Documentos necessários"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pessoa Física - Título</label>
              <input
                type="text"
                value={data.docsPfTitle}
                onChange={(e) => setData((d) => ({ ...d, docsPfTitle: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Pessoa Física"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pessoa Física - Itens</label>
              <ItemListEditor
                items={data.docsPfItems}
                onChange={(items) => setData((d) => ({ ...d, docsPfItems: items }))}
                placeholder="Ex: Carteira Nacional de Habilitação (CNH)"
                emptyMessage="Nenhum item."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pessoa Jurídica - Título</label>
              <input
                type="text"
                value={data.docsPjTitle}
                onChange={(e) => setData((d) => ({ ...d, docsPjTitle: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Pessoa Jurídica (PJ)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pessoa Jurídica - Itens</label>
              <ItemListEditor
                items={data.docsPjItems}
                onChange={(items) => setData((d) => ({ ...d, docsPjItems: items }))}
                placeholder="Ex: CNH do responsável"
                emptyMessage="Nenhum item."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nota (PJ)</label>
              <input
                type="text"
                value={data.docsPjNote}
                onChange={(e) => setData((d) => ({ ...d, docsPjNote: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="No caso de MEI, apresentar apenas o comprovante do MEI."
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
