'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPut, apiPost, type NewsItem, type NewsLink } from '@/lib/api';
import { slugifyUnique } from '@/lib/slug';

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
    links: [],
    published: true,
    publishedAt: new Date().toISOString().slice(0, 10),
  });
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (isNew) return;
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<NewsItem>(`/news/by-id/${id}`, token)
      .then((n) => {
        setNews({
          ...n,
          publishedAt: n.publishedAt ? n.publishedAt.slice(0, 10) : '',
          links: n.links || [],
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<{ items: NewsItem[] }>('/news?limit=200', token)
      .then((data) => setExistingSlugs(data.items.map((n) => n.slug).filter(Boolean)))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    const links = news.links && Array.isArray(news.links) && news.links.length > 0 
      ? news.links.filter((link: NewsLink) => link.label && link.url)
      : null;
    const payload = {
      ...news,
      links,
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
            onChange={(e) => {
              const title = e.target.value;
              setNews((n) => {
                const newSlug = slugManuallyEdited.current ? (n.slug ?? '') : slugifyUnique(title, existingSlugs, n.slug);
                return { ...n, title, slug: newSlug };
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
            value={news.slug ?? ''}
            onChange={(e) => {
              slugManuallyEdited.current = true;
              setNews((n) => ({ ...n, slug: e.target.value }));
            }}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="ex: novidade-2025"
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
        
        {/* Seção de Links */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Links relacionados</label>
            <button
              type="button"
              onClick={() => {
                const currentLinks = (news.links as NewsLink[]) || [];
                setNews((n) => ({
                  ...n,
                  links: [...currentLinks, { label: '', url: '', type: 'external' as const }],
                }));
              }}
              className="text-sm text-cdl-blue hover:text-cdl-blue-dark font-medium"
            >
              + Adicionar link
            </button>
          </div>
          <div className="space-y-3">
            {((news.links as NewsLink[]) || []).map((link, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Texto do link</label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const currentLinks = (news.links as NewsLink[]) || [];
                        const updated = [...currentLinks];
                        updated[index] = { ...updated[index], label: e.target.value };
                        setNews((n) => ({ ...n, links: updated }));
                      }}
                      placeholder="Ex: Baixar PDF"
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">URL</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => {
                        const currentLinks = (news.links as NewsLink[]) || [];
                        const updated = [...currentLinks];
                        updated[index] = { ...updated[index], url: e.target.value };
                        setNews((n) => ({ ...n, links: updated }));
                      }}
                      placeholder="https://exemplo.com/arquivo.pdf"
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name={`link-type-${index}`}
                        checked={link.type === 'external'}
                        onChange={() => {
                          const currentLinks = (news.links as NewsLink[]) || [];
                          const updated = [...currentLinks];
                          updated[index] = { ...updated[index], type: 'external' as const };
                          setNews((n) => ({ ...n, links: updated }));
                        }}
                        className="text-cdl-blue focus:ring-cdl-blue"
                      />
                      Link externo
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name={`link-type-${index}`}
                        checked={link.type === 'download'}
                        onChange={() => {
                          const currentLinks = (news.links as NewsLink[]) || [];
                          const updated = [...currentLinks];
                          updated[index] = { ...updated[index], type: 'download' as const };
                          setNews((n) => ({ ...n, links: updated }));
                        }}
                        className="text-cdl-blue focus:ring-cdl-blue"
                      />
                      Download
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentLinks = (news.links as NewsLink[]) || [];
                      const updated = currentLinks.filter((_, i) => i !== index);
                      setNews((n) => ({ ...n, links: updated.length > 0 ? updated : null }));
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            {(!news.links || (news.links as NewsLink[]).length === 0) && (
              <p className="text-sm text-cdl-gray-text italic py-4 text-center border border-dashed border-gray-300 rounded-lg">
                Nenhum link adicionado. Clique em "Adicionar link" para incluir links para PDFs, sites externos, etc.
              </p>
            )}
          </div>
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
