import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

const campanhasData: Record<string, {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  category: string;
  highlights: string[];
  benefits?: string[];
  howToParticipate?: string;
  contact?: string;
}> = {
  'cafe-com-elas': {
    id: 'cafe-com-elas',
    title: 'Café com Elas',
    description: 'Um encontro especial dedicado às mulheres empreendedoras de Paulo Afonso.',
    fullDescription: 'O Café com Elas é um evento periódico promovido pela CDL Paulo Afonso com o objetivo de fortalecer o empreendedorismo feminino na nossa cidade. Este encontro proporciona um ambiente acolhedor para networking, troca de experiências e aprendizado contínuo.',
    date: 'Evento periódico',
    category: 'Networking',
    highlights: [
      'Networking exclusivo para mulheres empreendedoras',
      'Palestras com profissionais de destaque',
      'Troca de experiências e cases de sucesso',
      'Mentorias e orientações para crescimento empresarial',
      'Oportunidades de parcerias e negócios',
    ],
    benefits: [
      'Ampliação da rede de contatos profissionais',
      'Acesso a conhecimento e tendências de mercado',
      'Suporte para desenvolvimento de negócios',
      'Visibilidade para seu empreendimento',
    ],
    howToParticipate: 'Para participar do Café com Elas, entre em contato conosco através dos nossos canais de atendimento ou compareça à sede da CDL Paulo Afonso. O evento é exclusivo para associadas e convidadas especiais.',
    contact: 'Entre em contato conosco para mais informações sobre datas e inscrições.',
  },
  'sao-joao-comercio': {
    id: 'sao-joao-comercio',
    title: 'São João do Comércio',
    description: 'A maior festa junina do comércio de Paulo Afonso!',
    fullDescription: 'O São João do Comércio é uma das principais campanhas promovidas pela CDL Paulo Afonso durante o período junino. Esta celebração une tradição, cultura e negócios, promovendo o fortalecimento do comércio local através de uma programação especial que movimenta toda a cidade.',
    date: 'Junho',
    category: 'Festival',
    highlights: [
      'Movimentação intensa do comércio local',
      'Programação cultural e festiva',
      'Promoções especiais nos estabelecimentos associados',
      'Eventos e atrações para toda a família',
      'Fortalecimento da economia local',
    ],
    benefits: [
      'Aumento significativo nas vendas',
      'Maior visibilidade para seu negócio',
      'Participação em campanha promocional regional',
      'Integração com outros comerciantes',
    ],
    howToParticipate: 'Associados da CDL Paulo Afonso podem participar do São João do Comércio cadastrando suas promoções e ofertas especiais. Entre em contato conosco para receber o material de divulgação e orientações sobre como participar.',
    contact: 'Fique atento às nossas comunicações para saber as datas e como participar da próxima edição.',
  },
  'natal-premiado-cdl': {
    id: 'natal-premiado-cdl',
    title: 'Natal Premiado CDL',
    description: 'A campanha de Natal que movimenta o comércio de Paulo Afonso!',
    fullDescription: 'O Natal Premiado CDL é a maior campanha promocional do ano, realizada durante os meses de novembro e dezembro. Esta iniciativa movimenta todo o comércio de Paulo Afonso, oferecendo aos consumidores a oportunidade de concorrer a prêmios incríveis enquanto fazem suas compras nos estabelecimentos associados.',
    date: 'Novembro - Dezembro',
    category: 'Campanha',
    highlights: [
      'Sorteios de prêmios em dinheiro e produtos',
      'Movimentação recorde do comércio',
      'Promoções especiais em todos os setores',
      'Campanha amplamente divulgada na região',
      'Aumento significativo no fluxo de clientes',
    ],
    benefits: [
      'Aumento expressivo nas vendas de fim de ano',
      'Atração de novos clientes',
      'Fidelização de clientes existentes',
      'Participação em campanha de grande visibilidade',
    ],
    howToParticipate: 'Todos os associados da CDL Paulo Afonso podem participar do Natal Premiado CDL. A campanha funciona através da distribuição de cupons a cada compra realizada nos estabelecimentos participantes. Quanto mais você compra, mais chances de ganhar!',
    contact: 'Acompanhe nossas redes sociais e comunicações para ficar por dentro de todas as novidades da campanha.',
  },
};

export async function generateStaticParams() {
  return Object.keys(campanhasData).map((slug) => ({ slug }));
}

export default function CampanhaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campanha = campanhasData[slug];

  if (!campanha) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-white to-cdl-gray/30">
      <div className="container-cdl max-w-4xl">
        <Link href="/institucional/campanhas" className="text-sm text-cdl-blue hover:underline mb-6 inline-block">
          ← Voltar às campanhas
        </Link>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 text-sm font-semibold rounded-full bg-cdl-blue text-white">
              {campanha.category}
            </span>
            <span className="text-sm text-cdl-gray-text flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {campanha.date}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {campanha.title}
          </h1>
          <p className="text-xl text-cdl-gray-text leading-relaxed">
            {campanha.description}
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-cdl-blue/20 to-cdl-blue-dark/20 mb-10 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-cdl-blue/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-cdl-gray-text">{campanha.date}</p>
          </div>
        </div>

        {/* Full Description */}
        <section className="mb-10">
          <div className="prose prose-cdl max-w-none">
            <p className="text-lg text-cdl-gray-text leading-relaxed">
              {campanha.fullDescription}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Destaques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campanha.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cdl-blue/10 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-cdl-gray-text">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        {campanha.benefits && campanha.benefits.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefícios</h2>
            <div className="bg-gradient-to-r from-cdl-blue/10 to-cdl-blue-dark/10 rounded-xl p-6 border border-cdl-blue/20">
              <ul className="space-y-3">
                {campanha.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cdl-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-cdl-gray-text">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* How to Participate */}
        {campanha.howToParticipate && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Participar</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-cdl-gray-text leading-relaxed">
                {campanha.howToParticipate}
              </p>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-cdl-blue to-cdl-blue-dark rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Quer saber mais?</h2>
            <p className="text-blue-100 mb-6">
              {campanha.contact || 'Entre em contato conosco para mais informações sobre esta campanha.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atendimento" className="btn-secondary bg-white text-cdl-blue hover:bg-gray-100">
                Entre em contato
              </Link>
              <Link href="/associe-se" className="btn-secondary border-2 border-white text-white hover:bg-white/10">
                Associe-se
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
