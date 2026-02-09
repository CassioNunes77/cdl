'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPut, type About } from '@/lib/api';

function getApiBase(): string {
  if (typeof window === 'undefined') return '';
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
}

export default function AdminCDLPauloAfonsoPage() {
  const [about, setAbout] = useState<About>({ title: '', description: '', photo: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    apiGet<About>('/about', token)
      .then(setAbout)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleFileUpload(file: File) {
    setUploading(true);
    const token = localStorage.getItem('cdl_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${getApiBase()}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Erro ao fazer upload');
      const data = await res.json();
      setAbout((a) => ({ ...a, photo: data.url }));
    } catch (err) {
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    try {
      await apiPut('/about', about, token);
      alert('Salvo com sucesso!');
    } catch (err) {
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">CDL Paulo Afonso</h1>
      <p className="mt-2 text-sm text-cdl-gray-text">Edite as informações sobre a CDL Paulo Afonso</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
          {about.photo && (
            <div className="mb-4">
              <img
                src={about.photo.startsWith('http') ? about.photo : `${getApiBase()}${about.photo}`}
                alt="Preview"
                className="max-w-md h-auto rounded-lg border border-gray-300"
              />
            </div>
          )}
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              disabled={uploading}
              className="block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cdl-blue file:text-white hover:file:bg-cdl-blue-dark file:cursor-pointer"
            />
            {uploading && <span className="text-sm text-cdl-gray-text">Enviando...</span>}
          </div>
          <p className="mt-2 text-xs text-cdl-gray-text">Ou cole uma URL de imagem:</p>
          <input
            type="text"
            value={about.photo ?? ''}
            onChange={(e) => setAbout((a) => ({ ...a, photo: e.target.value || null }))}
            placeholder="https://exemplo.com/imagem.jpg"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={about.title}
            onChange={(e) => setAbout((a) => ({ ...a, title: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="CDL Paulo Afonso"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            required
            value={about.description}
            onChange={(e) => setAbout((a) => ({ ...a, description: e.target.value }))}
            rows={8}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Descrição sobre a CDL Paulo Afonso..."
          />
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
