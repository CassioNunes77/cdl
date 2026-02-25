'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCampaign } from '@/lib/firestore';

export default function AdminNewCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createCampaign({
        title,
        description,
        fullDescription: fullDescription || undefined,
        date: date || undefined,
        category: category || undefined,
        image: imageUrl || undefined,
      });
      router.push('/admin/campanhas');
    } catch (err) {
      setError('Erro ao criar campanha');
    } finally {
      setLoading(false);
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
      const form = new FormData();
      // imgbb accepts multipart/form-data with field 'image' (binary or base64)
      form.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data && data.data && data.data.url) {
        setImageUrl(data.data.url);
      } else {
        setImageError('Erro ao enviar imagem');
      }
    } catch (e) {
      setImageError('Erro ao enviar imagem');
    } finally {
      setImageUploading(false);
    }
  }

  return (
    <div>
      <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Campanhas</Link>
      <h1 className="text-2xl font-bold text-gray-900">Nova campanha</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição curta</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto destaque</label>
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
          </div>
          {imageUrl && (
            <div className="mt-3">
              <img src={imageUrl} alt="preview" className="w-48 h-auto rounded-md border" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição completa</label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data/Período</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="ex: Junho, Novembro - Dezembro"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="ex: Networking, Festival, Campanha"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Salvando...' : 'Criar campanha'}
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

