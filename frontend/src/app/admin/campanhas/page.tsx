'use client';

import Link from 'next/link';

// Dados estáticos das campanhas (mesmos da página pública)
const campanhas = [
  {
    id: 'cafe-com-elas',
    title: 'Café com Elas',
    description: 'Um encontro especial dedicado às mulheres empreendedoras de Paulo Afonso.',
    date: 'Evento periódico',
    category: 'Networking',
  },
  {
    id: 'sao-joao-comercio',
    title: 'São João do Comércio',
    description: 'A maior festa junina do comércio de Paulo Afonso!',
    date: 'Junho',
    category: 'Festival',
  },
  {
    id: 'natal-premiado-cdl',
    title: 'Natal Premiado CDL',
    description: 'A campanha de Natal que movimenta o comércio de Paulo Afonso!',
    date: 'Novembro - Dezembro',
    category: 'Campanha',
  },
];

export default function AdminCampanhasPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campanhas</h1>
          <p className="mt-1 text-sm text-cdl-gray-text">Gerencie as campanhas e eventos promovidos pela CDL</p>
        </div>
        <Link href="/institucional/campanhas" target="_blank" className="btn-secondary">
          Ver página pública
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campanhas.map((campanha) => (
          <div
            key={campanha.id}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{campanha.title}</h3>
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-cdl-blue text-white mb-3">
                    {campanha.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-cdl-gray-text mb-4 line-clamp-2">{campanha.description}</p>
              <div className="flex items-center gap-2 text-xs text-cdl-gray-text mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {campanha.date}
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Link
                  href={`/institucional/campanhas/${campanha.id}`}
                  target="_blank"
                  className="flex-1 text-center px-3 py-2 text-sm text-cdl-blue hover:bg-cdl-blue/10 rounded-lg transition-colors"
                >
                  Ver página
                </Link>
                <Link
                  href={`/admin/campanhas/${campanha.id}`}
                  className="flex-1 text-center px-3 py-2 text-sm bg-cdl-blue text-white hover:bg-cdl-blue-dark rounded-lg transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl border border-gray-200 bg-blue-50">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Sobre o gerenciamento de campanhas</h3>
            <p className="text-sm text-cdl-gray-text">
              As campanhas são gerenciadas através de arquivos estáticos. Para editar o conteúdo das campanhas, 
              edite o arquivo <code className="text-xs bg-white px-1 py-0.5 rounded">frontend/src/app/institucional/campanhas/[slug]/page.tsx</code>.
              Em breve, esta funcionalidade será integrada ao banco de dados para gerenciamento completo via interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
