import Link from 'next/link';

export const dynamic = 'force-static';

const events = [
  {
    id: 'cafe-com-elas',
    title: 'Café com Elas',
    description: 'Um encontro especial dedicado às mulheres empreendedoras de Paulo Afonso. Networking, palestras inspiradoras e troca de experiências para fortalecer o empreendedorismo feminino na nossa cidade.',
    image: '/images/eventos/cafe-com-elas.jpg',
    date: 'Evento periódico',
    category: 'Networking',
  },
  {
    id: 'sao-joao-comercio',
    title: 'São João do Comércio',
    description: 'A maior festa junina do comércio de Paulo Afonso! Uma celebração que une tradição, cultura e negócios, promovendo o fortalecimento do comércio local durante o período junino.',
    image: '/images/eventos/sao-joao-comercio.jpg',
    date: 'Junho',
    category: 'Festival',
  },
  {
    id: 'natal-premiado-cdl',
    title: 'Natal Premiado CDL',
    description: 'A campanha de Natal que movimenta o comércio de Paulo Afonso! Participe e concorra a prêmios incríveis enquanto faz suas compras nos estabelecimentos associados à CDL.',
    image: '/images/eventos/natal-premiado.jpg',
    date: 'Novembro - Dezembro',
    category: 'Campanha',
  },
];

export default function CampanhasPage() {
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-white to-cdl-gray/30">
      <div className="container-cdl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Campanhas e Eventos
          </h1>
          <p className="text-lg sm:text-xl text-cdl-gray-text max-w-3xl mx-auto">
            Conheça as principais campanhas e eventos promovidos pela CDL Paulo Afonso para fortalecer o comércio local e promover o desenvolvimento empresarial.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/institucional/campanhas/${event.id}`}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-cdl-blue/30 transition-all block"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-cdl-blue/20 to-cdl-blue-dark/20 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cdl-blue/10 flex items-center justify-center">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-cdl-gray-text">{event.date}</p>
                </div>
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cdl-blue text-white">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cdl-blue transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-cdl-gray-text leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-cdl-gray-text flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {event.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-xl bg-gradient-to-r from-cdl-blue to-cdl-blue-dark text-white">
            <h2 className="text-2xl font-bold mb-3">Quer participar dos nossos eventos?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Entre em contato conosco e fique por dentro de todas as campanhas e eventos promovidos pela CDL Paulo Afonso.
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
        </div>
      </div>
    </div>
  );
}
