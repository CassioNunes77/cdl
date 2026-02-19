'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const campanhasData: Record<string, {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  category: string;
}> = {
  'cafe-com-elas': {
    id: 'cafe-com-elas',
    title: 'Café com Elas',
    description: 'Um encontro especial dedicado às mulheres empreendedoras de Paulo Afonso.',
    fullDescription: 'O Café com Elas é um evento periódico promovido pela CDL Paulo Afonso com o objetivo de fortalecer o empreendedorismo feminino na nossa cidade.',
    date: 'Evento periódico',
    category: 'Networking',
  },
  'sao-joao-comercio': {
    id: 'sao-joao-comercio',
    title: 'São João do Comércio',
    description: 'A maior festa junina do comércio de Paulo Afonso!',
    fullDescription: 'O São João do Comércio é uma das principais campanhas promovidas pela CDL Paulo Afonso durante o período junino.',
    date: 'Junho',
    category: 'Festival',
  },
  'natal-premiado-cdl': {
    id: 'natal-premiado-cdl',
    title: 'Natal Premiado CDL',
    description: 'A campanha de Natal que movimenta o comércio de Paulo Afonso!',
    fullDescription: 'O Natal Premiado CDL é a maior campanha promocional do ano, realizada durante os meses de novembro e dezembro.',
    date: 'Novembro - Dezembro',
    category: 'Campanha',
  },
};

export default function AdminCampanhaEditPage() {
  const params = useParams();
  const id = params.id as string;
  const campanha = campanhasData[id];

  if (!campanha) {
    return (
      <div>
        <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">
          ← Voltar às campanhas
        </Link>
        <div className="mt-8 p-8 rounded-xl border border-gray-200 bg-white text-center">
          <p className="text-cdl-gray-text">Campanha não encontrada.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/campanhas" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">
        ← Voltar às campanhas
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{campanha.title}</h1>
        <p className="text-cdl-gray-text mb-6">Visualização e edição da campanha</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações da Campanha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <p className="text-gray-900">{campanha.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-cdl-blue text-white">
                  {campanha.category}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data/Período</label>
                <p className="text-gray-900">{campanha.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <p className="text-cdl-gray-text">{campanha.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Completa</label>
                <p className="text-cdl-gray-text">{campanha.fullDescription}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-yellow-200 bg-yellow-50">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Edição via código</h3>
                <p className="text-sm text-cdl-gray-text mb-3">
                  Para editar o conteúdo completo desta campanha, edite o arquivo:
                </p>
                <code className="block text-xs bg-white px-3 py-2 rounded border border-yellow-200 mb-3">
                  frontend/src/app/institucional/campanhas/[slug]/page.tsx
                </code>
                <p className="text-sm text-cdl-gray-text">
                  Em breve, esta funcionalidade será integrada ao banco de dados para permitir edição completa via interface administrativa.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href={`/institucional/campanhas/${campanha.id}`}
              target="_blank"
              className="btn-secondary"
            >
              Ver página pública
            </Link>
            <Link href="/admin/campanhas" className="btn-primary">
              Voltar à listagem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
