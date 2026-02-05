'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPut, apiPost, type Director } from '@/lib/api';

export default function AdminDiretorEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'novo';
  const [dir, setDir] = useState<Partial<Director>>({ name: '', role: '', photo: '', bio: '', order: 0 });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    const token = localStorage.getItem('cdl_admin_token');
    apiGet<Director>(`/directors/${id}`, token)
      .then(setDir)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    try {
      if (isNew) {
        await apiPost('/directors', dir, token);
        router.push('/admin/diretoria');
      } else {
        await apiPut(`/directors/${id}`, dir, token);
        router.push('/admin/diretoria');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading && !isNew) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <Link href="/admin/diretoria" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Diretoria</Link>
      <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Novo membro' : 'Editar membro'}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            required
            value={dir.name ?? ''}
            onChange={(e) => setDir((d) => ({ ...d, name: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            required
            value={dir.role ?? ''}
            onChange={(e) => setDir((d) => ({ ...d, role: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL da foto</label>
          <input
            type="text"
            value={dir.photo ?? ''}
            onChange={(e) => setDir((d) => ({ ...d, photo: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="/uploads/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ordem</label>
          <input
            type="number"
            value={dir.order ?? 0}
            onChange={(e) => setDir((d) => ({ ...d, order: parseInt(e.target.value, 10) || 0 }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio (opcional)</label>
          <textarea
            value={dir.bio ?? ''}
            onChange={(e) => setDir((d) => ({ ...d, bio: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
