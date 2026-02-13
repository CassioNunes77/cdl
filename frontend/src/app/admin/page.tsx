'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{ pages: number; directors: number; services: number; news: number; messages: number; associates: number } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    Promise.all([
      apiGet<unknown[]>('/pages', token),
      apiGet<unknown[]>('/directors', token),
      apiGet<unknown[]>('/services', token),
      apiGet<{ items: unknown[] }>('/news', token),
      apiGet<unknown[]>('/contact', token),
      // TODO: Implementar API de associados
      // apiGet<unknown[]>('/associates', token).catch(() => []),
    ])
      .then(([pages, directors, services, newsRes, messages]) => {
        setStats({
          pages: (pages as unknown[]).length,
          directors: (directors as unknown[]).length,
          services: (services as unknown[]).length,
          news: (newsRes as { items: unknown[] }).items?.length ?? 0,
          messages: (messages as unknown[]).length,
          associates: 200, // Valor estático baseado na estatística da homepage
        });
      })
      .catch(() => setStats({ pages: 0, directors: 0, services: 0, news: 0, messages: 0, associates: 0 }));
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
      
      {/* Card de Associados em Destaque */}
      <div className="mt-8 mb-6">
        <Link
          href="/admin/associados"
          className="block p-8 rounded-xl bg-gradient-to-r from-cdl-blue to-cdl-blue-dark text-white hover:shadow-lg transition-all border-2 border-transparent hover:border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Associados</p>
              <p className="mt-2 text-4xl font-bold">{stats?.associates ?? '—'}</p>
              <p className="mt-1 text-sm text-blue-100">Empresas associadas</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Outros Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
