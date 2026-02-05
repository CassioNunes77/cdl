'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPut, apiPost, type NewsItem } from '@/lib/api';

export default function AdminNoticiaEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'nova';
  const [news, setNews] = useState<Partial<NewsItem>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    published: true,
    publishedAt: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<NewsItem>(`/news/by-id/${id}`, token)
      .then((n) => setNews({ ...n, publishedAt: n.publishedAt ? n.publishedAt.slice(0, 10) : '' }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    const payload = {
      ...news,
      publishedAt: news.publishedAt ? new Date(news.publishedAt).toISOString() : new Date().toISOString(),
    };
    try {
      if (isNew) {
        await apiPost('/news', payload, token);
        router.push('/admin/noticias');
      } else {
        await apiPut(`/news/${id}`, payload, token);
        router.push('/admin/noticias');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading && !isNew) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <Link href="/admin/noticias" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Notícias</Link>
      <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Nova notícia' : 'Editar notícia'}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={news.title ?? ''}
            onChange={(e) => setNews((n) => ({ ...n, title: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
          <input
            type="text"
            required
            value={news.slug ?? ''}
            onChange={(e) => setNews((n) => ({ ...n, slug: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Resumo</label>
          <textarea
            required
            value={news.excerpt ?? ''}
            onChange={(e) => setNews((n) => ({ ...n, excerpt: e.target.value }))}
            rows={2}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Conteúdo (HTML)</label>
          <textarea
            required
            value={news.content ?? ''}
            onChange={(e) => setNews((n) => ({ ...n, content: e.target.value }))}
            rows={10}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL da imagem</label>
          <input
            type="text"
            value={news.image ?? ''}
            onChange={(e) => setNews((n) => ({ ...n, image: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de publicação</label>
          <input
            type="date"
            value={news.publishedAt ?? ''}
            onChange={(e) => setNews((n) => ({ ...n, publishedAt: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={(news as { published?: boolean }).published ?? true}
            onChange={(e) => setNews((n) => ({ ...n, published: e.target.checked }))}
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
