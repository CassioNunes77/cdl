'use client';

import Link from 'next/link';

export default function AdminAssociadosPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Associados</h1>
          <p className="mt-1 text-cdl-gray-text">Gestão de empresas associadas</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cdl-blue/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-cdl-blue"
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Gestão de Associados
          </h2>
          <p className="text-cdl-gray-text mb-6">
            A funcionalidade de gestão de associados será implementada em breve. Aqui você poderá visualizar, adicionar e gerenciar todas as empresas associadas à CDL Paulo Afonso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/admin" className="btn-secondary">
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
