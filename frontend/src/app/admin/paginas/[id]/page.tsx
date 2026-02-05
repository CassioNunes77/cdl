'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPut, apiPost, type Page } from '@/lib/api';
import { slugify, slugifyUnique } from '@/lib/slug';

export default function AdminPaginaEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'nova';
  const [page, setPage] = useState<Partial<Page>>({ title: '', slug: '', content: '', excerpt: '', published: true });
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (isNew) return;
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<Page>(`/pages/by-id/${id}`, token).then((p) => setPage(p)).catch(() => {}).finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(() => {
    apiGet<Page[]>('/pages').then((list) => setExistingSlugs(list.map((p) => p.slug).filter(Boolean))).catch(() => {});
  }, []);

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
            onChange={(e) => {
              const title = e.target.value;
              setPage((p) => {
                const newSlug = slugManuallyEdited.current ? (p.slug ?? '') : slugifyUnique(title, existingSlugs, p.slug);
                return { ...p, title, slug: newSlug };
              });
            }}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL) — preenchido automaticamente</label>
          <input
            type="text"
            required
            value={page.slug ?? ''}
            onChange={(e) => {
              slugManuallyEdited.current = true;
              setPage((p) => ({ ...p, slug: e.target.value }));
            }}
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
