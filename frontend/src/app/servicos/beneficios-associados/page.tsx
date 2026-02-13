import Link from 'next/link';

export const dynamic = 'force-static';

const partners = [
  { name: 'Unirios', description: 'Convênio especial para associados' },
  { name: 'Colégio Sete', description: 'Descontos de 20% a 30% dependendo do curso' },
  { name: 'Stone', description: 'Condições especiais para associados' },
  { name: 'Sicoob', description: 'Taxas diferenciadas para associados' },
  { name: 'CNA', description: '50% de desconto para funcionários, filhos e cônjuges dos proprietários' },
  { name: 'Paulo Afonso TEM', description: 'Benefícios exclusivos para associados' },
  { name: '7ELLOS', description: 'Condições especiais para associados' },
  { name: 'Laboratório Estrela', description: 'Convênio especial para associados' },
  { name: 'Auto Escola PA', description: 'Desconto para funcionários' },
  { name: 'Rocha Menezes Advocacia', description: 'Convênio exclusivo para associados' },
  { name: 'LN Cursos e Concurso', description: 'Condições especiais para associados' },
  { name: 'Oralface', description: 'Convênio especial para associados' },
];

export default function BeneficiosAssociadosPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Benefícios para Associados
        </h1>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-cdl-blue via-cdl-blue-dark to-cdl-blue">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-white/80 text-sm text-center">
              Imagem será adicionada aqui
            </p>
          </div>
        </div>

        <div className="prose prose-cdl max-w-none">
          {/* Seção: Novo Programa de Benefícios */}
          <div className="mb-10 p-6 bg-gradient-to-r from-cdl-blue/10 to-cdl-blue-dark/10 rounded-xl border-2 border-cdl-blue/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Novo Programa de Benefícios para Associados</h2>
            <p className="text-cdl-gray-text leading-relaxed mb-4">
              A CDL Paulo Afonso estabeleceu parcerias estratégicas com empresas locais para oferecer condições especiais aos nossos associados. 
              Através desses convênios, você tem acesso a descontos e benefícios exclusivos em diversos segmentos, fortalecendo ainda mais o seu negócio e proporcionando economia para sua empresa.
            </p>
            <p className="text-sm text-cdl-gray-text italic">
              Para conhecer as condições específicas de cada convênio, entre em contato diretamente com nossos parceiros ou através da CDL.
            </p>
          </div>

          {/* Informações Principais */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Acesso às Plataformas</h3>
              </div>
              <p className="text-sm text-cdl-gray-text">
                Consultas disponíveis conforme o tipo de pacote escolhido na associação.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Certificado Digital</h3>
              </div>
              <p className="text-sm text-cdl-gray-text">
                <strong className="text-cdl-blue">Desconto especial:</strong> de R$ 189,00 para R$ 156,00 para associados.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Clube de Benefícios</h3>
              </div>
              <p className="text-sm text-cdl-gray-text">
                Integração ao clube de benefícios Core+ com acesso a vantagens exclusivas.
              </p>
            </div>
          </div>

          {/* Cards dos Parceiros */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Parceiros e Convênios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-gray-200 bg-white hover:border-cdl-blue/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cdl-blue/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
                      <p className="text-sm text-cdl-gray-text">{partner.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificado Digital e Core+ destacados */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border-2 border-cdl-blue/30 bg-gradient-to-br from-cdl-blue/5 to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-cdl-blue flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Certificado Digital</h3>
              </div>
              <p className="text-cdl-gray-text mb-4">
                Condições especiais para associados com desconto de R$ 33,00 na emissão.
              </p>
              <Link href="/servicos/certificado-digital" className="text-sm font-medium text-cdl-blue hover:underline">
                Saiba mais →
              </Link>
            </div>

            <div className="p-6 rounded-xl border-2 border-cdl-blue/30 bg-gradient-to-br from-cdl-blue/5 to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-cdl-blue flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Core+</h3>
              </div>
              <p className="text-cdl-gray-text mb-4">
                Clube de benefícios exclusivo com acesso a vantagens e descontos em diversos estabelecimentos.
              </p>
              <a href="https://sistema.spc.org.br/spc/controleacesso/autenticacao/entry.action" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cdl-blue hover:underline">
                Acessar Core+ →
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 p-8 bg-gradient-to-r from-cdl-blue/10 to-cdl-blue-dark/10 rounded-xl border-2 border-cdl-blue/30">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Faça parte da nossa comunidade empresarial
              </h2>
              <p className="text-cdl-gray-text mb-6 max-w-2xl mx-auto">
                Associe-se à CDL Paulo Afonso e tenha acesso a todos esses benefícios exclusivos. 
                Fortaleça seu negócio e faça parte de uma rede que impulsiona o comércio local.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/associe-se" className="btn-primary">
                  Associe-se agora
                </Link>
                <Link href="/atendimento" className="btn-secondary">
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
