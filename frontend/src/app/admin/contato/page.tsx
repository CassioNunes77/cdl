'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPatch } from '@/lib/api';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminContatoPage() {
  const [list, setList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    apiGet<Message[]>('/contact', token)
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  async function markRead(id: string) {
    const token = localStorage.getItem('cdl_admin_token');
    await apiPatch(`/contact/${id}/read`, {}, token);
    setList((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Mensagens de contato</h1>
      <p className="mt-1 text-cdl-gray-text">Formulário de atendimento do site</p>
      <div className="mt-6 space-y-4">
        {list.length === 0 ? (
          <p className="text-cdl-gray-text">Nenhuma mensagem.</p>
        ) : (
          list.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border p-6 bg-white ${m.read ? 'border-gray-200' : 'border-cdl-blue/30 bg-blue-50/30'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">{m.name}</p>
                  <p className="text-sm text-cdl-gray-text">{m.email}</p>
                  {m.phone && <p className="text-sm text-cdl-gray-text">{m.phone}</p>}
                  {m.subject && <p className="mt-1 text-sm font-medium text-gray-700">Assunto: {m.subject}</p>}
                  <p className="mt-3 text-gray-700 whitespace-pre-wrap">{m.message}</p>
                  <p className="mt-2 text-xs text-cdl-gray-text">
                    {new Date(m.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                {!m.read && (
                  <button
                    type="button"
                    onClick={() => markRead(m.id)}
                    className="shrink-0 rounded-lg bg-cdl-blue px-3 py-1.5 text-sm text-white hover:bg-cdl-blue-dark"
                  >
                    Marcar como lida
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
