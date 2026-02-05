'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPut, apiPost, type Service } from '@/lib/api';
import { slugifyUnique } from '@/lib/slug';

export default function AdminServicoEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'novo';
  const [svc, setSvc] = useState<Partial<Service>>({ title: '', slug: '', description: '', published: true, order: 0 });
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (isNew) return;
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<Service>(`/services/by-id/${id}`, token)
      .then(setSvc)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<Service[]>('/services', token)
      .then((list) => setExistingSlugs(list.map((s) => s.slug).filter(Boolean)))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    try {
      if (isNew) {
        await apiPost('/services', svc, token);
        router.push('/admin/servicos');
      } else {
        await apiPut(`/services/${id}`, svc, token);
        router.push('/admin/servicos');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading && !isNew) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <Link href="/admin/servicos" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Serviços</Link>
      <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Novo serviço' : 'Editar serviço'}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={svc.title ?? ''}
            onChange={(e) => {
              const title = e.target.value;
              setSvc((s) => {
                const newSlug = slugManuallyEdited.current ? (s.slug ?? '') : slugifyUnique(title, existingSlugs, s.slug);
                return { ...s, title, slug: newSlug };
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
            value={svc.slug ?? ''}
            onChange={(e) => {
              slugManuallyEdited.current = true;
              setSvc((s) => ({ ...s, slug: e.target.value }));
            }}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="ex: spc-serasa"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            required
            value={svc.description ?? ''}
            onChange={(e) => setSvc((s) => ({ ...s, description: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ordem</label>
          <input
            type="number"
            value={svc.order ?? 0}
            onChange={(e) => setSvc((s) => ({ ...s, order: parseInt(e.target.value, 10) || 0 }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={svc.published ?? true}
            onChange={(e) => setSvc((s) => ({ ...s, published: e.target.checked }))}
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
