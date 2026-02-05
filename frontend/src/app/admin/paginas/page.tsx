'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiDelete, type Page } from '@/lib/api';

export default function AdminPaginasPage() {
  const [list, setList] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    apiGet<Page[]>('/pages', token)
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  async function remove(id: string) {
    if (!confirm('Excluir esta página?')) return;
    const token = localStorage.getItem('cdl_admin_token');
    await apiDelete(`/pages/${id}`, token);
    setList((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Páginas</h1>
        <Link href="/admin/paginas/nova" className="btn-primary">
          Nova página
        </Link>
      </div>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-cdl-gray">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Título</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {list.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{p.title}</td>
                <td className="px-4 py-3 text-sm text-cdl-gray-text">{p.slug}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {p.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  <Link href={`/admin/paginas/${p.id}`} className="text-cdl-blue hover:underline mr-3">
                    Editar
                  </Link>
                  <button type="button" onClick={() => remove(p.id)} className="text-red-600 hover:underline">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="p-8 text-center text-cdl-gray-text">Nenhuma página cadastrada.</p>
        )}
      </div>
    </div>
  );
}
