'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPut, apiPost, type Page } from '@/lib/api';

export default function AdminPaginaEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'nova';
  const [page, setPage] = useState<Partial<Page>>({ title: '', slug: '', content: '', excerpt: '', published: true });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<Page>(`/pages/by-id/${id}`, token).then((p) => setPage(p)).catch(() => {}).finally(() => setLoading(false));
  }, [id, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    try {
      if (isNew) {
        await apiPost('/pages', page, token);
        router.push('/admin/paginas');
      } else {
        await apiPut(`/pages/${id}`, page, token);
        router.push('/admin/paginas');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <Link href="/admin/paginas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Páginas</Link>
      <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Nova página' : 'Editar página'}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={page.title ?? ''}
            onChange={(e) => setPage((p) => ({ ...p, title: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
          <input
            type="text"
            required
            value={page.slug ?? ''}
            onChange={(e) => setPage((p) => ({ ...p, slug: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="ex: nossa-cidade"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Resumo</label>
          <textarea
            value={page.excerpt ?? ''}
            onChange={(e) => setPage((p) => ({ ...p, excerpt: e.target.value }))}
            rows={2}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Conteúdo (HTML)</label>
          <textarea
            value={page.content ?? ''}
            onChange={(e) => setPage((p) => ({ ...p, content: e.target.value }))}
            rows={12}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={page.published ?? true}
            onChange={(e) => setPage((p) => ({ ...p, published: e.target.checked }))}
            className="rounded border-gray-300 text-cdl-blue focus:ring-cdl-blue"
          />
          <label htmlFor="published" className="text-sm text-gray-700">Publicado</label>
        </div>
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
