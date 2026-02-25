 'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCampaign, updateCampaign, Campaign } from '@/lib/firestore';

// imgbb upload key
const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

export default function AdminCampanhaEditByQueryPage() {
  const search = useSearchParams();
  const id = search.get('id') ?? '';
  const router = useRouter();
  const [campanha, setCampanha] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    if (!id) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const c = await getCampaign(id);
        if (mounted) setCampanha(c);
      } catch {
        if (mounted) setError('Erro ao carregar campanha');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;
  if (!id) {
    return (
      <div>
        <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Voltar às campanhas</Link>
        <div className="mt-8 p-8 rounded-xl border border-gray-200 bg-white text-center">
          <p className="text-cdl-gray-text">ID da campanha não informado.</p>
        </div>
      </div>
    );
  }
  if (!campanha) {
    return (
      <div>
        <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Voltar às campanhas</Link>
        <div className="mt-8 p-8 rounded-xl border border-gray-200 bg-white text-center">
          <p className="text-cdl-gray-text">Campanha não encontrada.</p>
        </div>
      </div>
    );
  }

  async function handleSave() {
    if (!campanha) return;
    setSaving(true);
    setError('');
    try {
      await updateCampaign(id, campanha);
      router.push('/admin/campanhas');
    } catch {
      setError('Erro ao salvar campanha');
    } finally {
      setSaving(false);
    }
  }

  async function uploadImageFile(file?: File | null) {
    if (!file) return;
    setImageError('');
    setImageUploading(true);
    try {
      if (!IMGBB_KEY) {
        setImageError('Chave de upload não configurada');
        return;
      }
      // compress + resize (reuse same approach as novo)
      const compressImage = async (input: File, maxDim = 1600, quality = 0.75): Promise<Blob | null> => {
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
          const outputType = 'image/webp';
          return await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) return resolve(blob);
              canvas.toBlob((blob2) => resolve(blob2), 'image/jpeg', quality);
            }, outputType, quality);
          });
        } catch (e) {
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
      };

      const compressed = await compressImage(file, 1600, 0.75);
      const toUpload = compressed && (compressed as Blob).size > 0 ? compressed : file;
      const form = new FormData();
      if (toUpload instanceof Blob && !(toUpload instanceof File)) {
        const filename = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
        form.append('image', toUpload, filename);
      } else {
        form.append('image', toUpload as File);
      }
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data && data.data && data.data.url) {
        setCampanha((c) => (c ? { ...c, image: data.data.url } : c));
      } else {
        setImageError('Erro ao enviar imagem');
      }
    } catch (e) {
      setImageError('Erro ao enviar imagem');
    } finally {
      setImageUploading(false);
    }
  }

  function removeImage() {
    setCampanha((c) => (c ? { ...c, image: undefined } : c));
  }

  return (
    <div>
      <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Voltar às campanhas</Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Editar campanha</h1>
        <p className="text-cdl-gray-text mb-6">Visualização e edição da campanha</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações da Campanha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input value={campanha.title} onChange={(e) => setCampanha({ ...campanha, title: e.target.value })} className="mt-1 block w-full rounded-lg border px-3 py-2" />
              </div>
            {campanha.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto destaque</label>
                <div className="mt-1">
                  <img src={campanha.image} alt="Foto destaque" className="w-48 h-auto rounded-md border" />
                </div>
              </div>
            )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <input value={campanha.category} onChange={(e) => setCampanha({ ...campanha, category: e.target.value })} className="mt-1 block w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data/Período</label>
                <input value={campanha.date} onChange={(e) => setCampanha({ ...campanha, date: e.target.value })} className="mt-1 block w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea value={campanha.description} onChange={(e) => setCampanha({ ...campanha, description: e.target.value })} className="mt-1 block w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Completa</label>
                <textarea value={campanha.fullDescription} onChange={(e) => setCampanha({ ...campanha, fullDescription: e.target.value })} className="mt-1 block w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto destaque</label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      if (file) uploadImageFile(file);
                    }}
                  />
                  {imageUploading && <span className="text-sm text-cdl-gray-text">Enviando...</span>}
                  {imageError && <span className="text-sm text-red-600">{imageError}</span>}
                  {campanha.image && (
                    <button type="button" onClick={removeImage} className="text-sm text-red-600 hover:underline">
                      Remover foto
                    </button>
                  )}
                </div>
                {campanha.image && (
                  <div className="mt-3">
                    <img src={campanha.image} alt="preview" className="w-48 h-auto rounded-md border" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-yellow-200 bg-yellow-50">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Edição via interface</h3>
                <p className="text-sm text-cdl-gray-text mb-3">Edite os campos acima e clique em salvar para atualizar a campanha no Firebase.</p>
                <p className="text-sm text-cdl-gray-text">A edição via código ainda funciona e pode ser usada como backup.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={handleSave} disabled={saving} className="btn-primary">{saving ? 'Salvando...' : 'Salvar'}</button>
            <Link href={`/institucional/campanhas/${campanha.id}`} target="_blank" className="btn-secondary">Ver página pública</Link>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

