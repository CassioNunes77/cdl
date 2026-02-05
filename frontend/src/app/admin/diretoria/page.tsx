'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiDelete, type Director } from '@/lib/api';

export default function AdminDiretoriaPage() {
  const [list, setList] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    apiGet<Director[]>('/directors', token)
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  async function remove(id: string) {
    if (!confirm('Excluir este membro?')) return;
    const token = localStorage.getItem('cdl_admin_token');
    await apiDelete(`/directors/${id}`, token);
    setList((prev) => prev.filter((d) => d.id !== id));
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Diretoria</h1>
        <Link href="/admin/diretoria/novo" className="btn-primary">
          Novo membro
        </Link>
      </div>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-cdl-gray">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cargo</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {list.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{d.name}</td>
                <td className="px-4 py-3 text-sm text-cdl-gray-text">{d.role}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <Link href={`/admin/diretoria/${d.id}`} className="text-cdl-blue hover:underline mr-3">
                    Editar
                  </Link>
                  <button type="button" onClick={() => remove(d.id)} className="text-red-600 hover:underline">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="p-8 text-center text-cdl-gray-text">Nenhum membro cadastrado.</p>
        )}
      </div>
    </div>
  );
}
