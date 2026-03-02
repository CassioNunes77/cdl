import Link from 'next/link';

export default function AreaAssociadoPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Área do Associado
        </h1>
        <p className="text-lg text-cdl-gray-text mb-10">
          Acesse serviços exclusivos e gerencie sua conta de associado da CDL Paulo Afonso.
        </p>

        {/* CTA Principal */}
        <div className="mb-10 p-8 rounded-xl bg-gradient-to-r from-cdl-blue to-cdl-blue-dark text-white">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Faça parte da maior comunidade empresarial
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Seja um associado e tenha acesso a benefícios exclusivos
            </p>
            <Link href="/associe-se" className="inline-flex items-center gap-2 bg-white text-cdl-blue px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Associe-se agora
            </Link>
          </div>
        </div>

        {/* Acesso ao Sistema SPC */}
        <div className="mb-10 p-8 rounded-xl border-2 border-cdl-blue bg-gradient-to-br from-cdl-blue/5 to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-cdl-blue flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sistema SPC</h2>
              </div>
              <p className="text-cdl-gray-text mb-4">
                Acesse o sistema SPC para realizar consultas de crédito, gerenciar informações e utilizar os serviços disponíveis para associados.
              </p>
              <a
                href="https://sistema.spc.org.br/spc/controleacesso/autenticacao/entry.action"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Acessar Sistema SPC
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Benefícios Principais */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefícios Exclusivos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Acesso às Plataformas */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Acesso às Consultas</h3>
                  <p className="text-sm text-cdl-gray-text">
                    Acesso às plataformas de consulta limitado ao tipo de pacote escolhido na sua associação.
                  </p>
                </div>
              </div>
            </div>

            {/* Certificado Digital */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Certificado Digital</h3>
                  <p className="text-sm text-cdl-gray-text mb-2">
                    Desconto especial para associados.
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-cdl-blue">R$ 156,00</span>
                    <span className="text-sm text-cdl-gray-text line-through">R$ 189,00</span>
                  </div>
                  <Link href="/servicos/certificado-digital" className="text-sm font-medium text-cdl-blue hover:underline mt-2 inline-block">
                    Saiba mais →
                  </Link>
                </div>
              </div>
            </div>

            {/* Clube de Benefícios */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Clube de Benefícios</h3>
                  <p className="text-sm text-cdl-gray-text mb-3">
                    Acesse descontos e vantagens exclusivas em diversos estabelecimentos parceiros.
                  </p>
                  <Link href="/servicos/beneficios-associados" className="text-sm font-medium text-cdl-blue hover:underline inline-flex items-center gap-1">
                    Veja mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Participação em Campanhas */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Participação em Campanhas</h3>
                  <p className="text-sm text-cdl-gray-text">
                    Participe de campanhas promocionais exclusivas como Natal Premiado, Liquida Paulo Afonso e outras ações especiais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda Via */}
        <div className="mb-10 p-6 rounded-xl border border-gray-200 bg-cdl-gray">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Segunda Via</h3>
              <p className="text-sm text-cdl-gray-text mb-4">
                Precisa de segunda via de documentos ou comprovantes? Entre em contato conosco através do atendimento.
              </p>
              <Link href="/atendimento" className="text-sm font-medium text-cdl-blue hover:underline inline-flex items-center gap-1">
                Solicitar segunda via
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="p-6 rounded-xl border border-gray-200 bg-white">
          <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://sistema.spc.org.br/spc/controleacesso/autenticacao/entry.action"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sistema SPC
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/servicos/beneficios-associados"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clube de Benefícios
            </Link>
            <Link
              href="/servicos/certificado-digital"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Certificado Digital
            </Link>
            <Link
              href="/atendimento"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Atendimento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
