import Link from 'next/link';
import { WhatsAppContactButton } from './WhatsAppContactButton';

export const dynamic = 'force-static';

export default function AuditorioPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-4xl">
        <Link href="/servicos" className="text-sm text-cdl-blue hover:underline mb-6 inline-block">
          ← Voltar aos serviços
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Auditório para Eventos
        </h1>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-cdl-blue to-cdl-blue-dark">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-white/80 text-sm text-center">
              Imagem do auditório será adicionada aqui
            </p>
          </div>
        </div>

        <div className="prose prose-cdl max-w-none">
          <p className="text-lg text-cdl-gray-text leading-relaxed">
            Realize seus eventos com conforto e tecnologia em um espaço moderno e equipado. 
            Nosso auditório oferece infraestrutura completa para apresentações, palestras, 
            workshops e transmissões de alta qualidade, proporcionando a melhor experiência 
            para você e seus convidados.
          </p>

          <div className="mt-8 p-6 bg-cdl-gray rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Infraestrutura</h2>
            <ul className="space-y-2 text-cdl-gray-text">
              <li className="flex items-start gap-2">
                <span className="text-cdl-blue mt-1">✓</span>
                <span>Sistema de som e iluminação profissional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cdl-blue mt-1">✓</span>
                <span>Equipamentos de projeção e telas de alta definição</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cdl-blue mt-1">✓</span>
                <span>Espaço climatizado e confortável</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cdl-blue mt-1">✓</span>
                <span>Capacidade para eventos de diversos portes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <WhatsAppContactButton message="Olá! Gostaria de contratar o Auditório para Eventos." />
        </div>
      </div>
    </div>
  );
}
