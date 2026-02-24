'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCampaign } from '@/lib/firestore';

export default function AdminNewCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const id = await createCampaign({ title, description, date, category });
      router.push(`/admin/campanhas/${id}`);
    } catch (err) {
      setError('Erro ao criar campanha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">← Voltar às campanhas</Link>
      <h1 className="text-2xl font-bold mb-4">Nova Campanha</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição curta</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data/Período</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Salvando...' : 'Criar campanha'}</button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

