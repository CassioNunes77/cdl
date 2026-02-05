'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{ pages: number; directors: number; services: number; news: number; messages: number } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    Promise.all([
      apiGet<unknown[]>('/pages', token),
      apiGet<unknown[]>('/directors', token),
      apiGet<unknown[]>('/services', token),
      apiGet<{ items: unknown[] }>('/news', token),
      apiGet<unknown[]>('/contact', token),
    ])
      .then(([pages, directors, services, newsRes, messages]) => {
        setStats({
          pages: (pages as unknown[]).length,
          directors: (directors as unknown[]).length,
          services: (services as unknown[]).length,
          news: (newsRes as { items: unknown[] }).items?.length ?? 0,
          messages: (messages as unknown[]).length,
        });
      })
      .catch(() => setStats({ pages: 0, directors: 0, services: 0, news: 0, messages: 0 }));
  }, []);

  const cards = [
    { label: 'Páginas', value: stats?.pages ?? '—', href: '/admin/paginas' },
    { label: 'Diretoria', value: stats?.directors ?? '—', href: '/admin/diretoria' },
    { label: 'Serviços', value: stats?.services ?? '—', href: '/admin/servicos' },
    { label: 'Notícias', value: stats?.news ?? '—', href: '/admin/noticias' },
    { label: 'Mensagens', value: stats?.messages ?? '—', href: '/admin/contato' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-cdl-gray-text">Visão geral do conteúdo do site</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block p-6 rounded-xl bg-white border border-gray-200 hover:border-cdl-blue/30 hover:shadow-md transition-all"
          >
            <p className="text-sm font-medium text-cdl-gray-text">{c.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
