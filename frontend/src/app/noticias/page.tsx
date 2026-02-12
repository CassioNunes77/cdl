import Link from 'next/link';
import Image from 'next/image';

const getApiBase = () => process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

// Notícias mockadas
const mockNews = [
  {
    id: '1',
    slug: 'cdl-paulo-afonso-lanca-novo-programa-beneficios-associados',
    title: 'CDL Paulo Afonso lança novo programa de benefícios para associados',
    excerpt: 'Programa inclui descontos em serviços essenciais, parcerias estratégicas e acesso exclusivo a eventos de networking para fortalecer o comércio local.',
    image: null,
    publishedAt: new Date(2025, 1, 10).toISOString(),
  },
  {
    id: '2',
    slug: 'certificado-digital-agiliza-processos-empresariais',
    title: 'Certificado Digital agiliza processos empresariais em Paulo Afonso',
    excerpt: 'Associados da CDL podem emitir certificados digitais com condições especiais, facilitando transações online e reduzindo burocracias.',
    image: null,
    publishedAt: new Date(2025, 1, 5).toISOString(),
  },
  {
    id: '3',
    slug: 'campanha-natal-premiado-2025-inscricoes-abertas',
    title: 'Campanha Natal Premiado 2025: Inscrições abertas para lojistas',
    excerpt: 'A maior campanha de fidelização do comércio de Paulo Afonso está com inscrições abertas. Participe e movimente suas vendas no final do ano.',
    image: null,
    publishedAt: new Date(2025, 0, 28).toISOString(),
  },
];

async function getNews() {
  const base = getApiBase();
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
    // Em produção sem API, retorna notícias mockadas
    return { items: mockNews };
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/news?limit=20`, { next: { revalidate: 60 } });
    if (!res.ok) return { items: mockNews };
    const data = await res.json();
    // Se não houver notícias da API, usa as mockadas
    return data.items && data.items.length > 0 ? data : { items: mockNews };
  } catch {
    return { items: mockNews };
  }
}

export default async function NoticiasPage() {
  const { items } = await getNews();
  
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Últimas Notícias</h1>
          <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">
            Acompanhe novidades do comércio, da CDL e da nossa comunidade empresarial.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((n: { id: string; title: string; slug: string; excerpt: string; image: string | null; publishedAt: string | null }) => (
              <Link
                key={n.id}
                href={`/noticias/${n.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-cdl-blue/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Imagem ou placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-cdl-blue/10 via-cdl-blue/5 to-transparent overflow-hidden">
                  {n.image ? (
                    <Image
                      src={n.image.startsWith('http') ? n.image : `${getApiBase()}${n.image}`}
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-cdl-blue/10 flex items-center justify-center">
                          <svg className="w-8 h-8 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-cdl-blue/60 uppercase tracking-wide">CDL</span>
                      </div>
                    </div>
                  )}
                  {/* Overlay gradient no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Data */}
                  {n.publishedAt && (
                    <time className="text-xs font-medium text-cdl-blue mb-3 block" dateTime={n.publishedAt}>
                      {new Date(n.publishedAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  )}
                  
                  {/* Título */}
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-cdl-blue transition-colors line-clamp-2 mb-3">
                    {n.title}
                  </h2>
                  
                  {/* Resumo */}
                  <p className="text-sm text-cdl-gray-text line-clamp-3 flex-1 mb-4">
                    {n.excerpt}
                  </p>
                  
                  {/* Link de leia mais */}
                  <span className="inline-flex items-center text-sm font-semibold text-cdl-blue group-hover:gap-2 transition-all">
                    Ler mais
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cdl-gray flex items-center justify-center">
              <svg className="w-10 h-10 text-cdl-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-cdl-gray-text text-lg">Nenhuma notícia publicada ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
