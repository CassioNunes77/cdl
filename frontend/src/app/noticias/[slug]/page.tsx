import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const getApiBase = () => process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

// Conteúdo completo das notícias mockadas
const mockNewsContent: Record<string, { title: string; excerpt: string; content: string; publishedAt: string; image: string | null }> = {
  'cdl-paulo-afonso-lanca-novo-programa-beneficios-associados': {
    title: 'CDL Paulo Afonso lança novo programa de benefícios para associados',
    excerpt: 'Programa inclui descontos em serviços essenciais, parcerias estratégicas e acesso exclusivo a eventos de networking para fortalecer o comércio local.',
    content: `
      <p>A Câmara de Dirigentes Lojistas de Paulo Afonso (CDL) anuncia o lançamento de um programa inovador de benefícios exclusivos para seus associados. O novo programa foi desenvolvido com o objetivo de fortalecer o comércio local e oferecer vantagens competitivas aos empresários da região.</p>
      
      <h2>Principais benefícios</h2>
      <p>O programa inclui uma série de vantagens estratégicas:</p>
      <ul>
        <li><strong>Descontos em serviços essenciais:</strong> Parcerias com fornecedores de serviços empresariais oferecem condições especiais para associados.</li>
        <li><strong>Networking exclusivo:</strong> Acesso a eventos e encontros de networking com outros empresários da região.</li>
        <li><strong>Consultoria especializada:</strong> Suporte técnico e consultoria em áreas como gestão, marketing e finanças.</li>
        <li><strong>Programas de capacitação:</strong> Cursos e workshops voltados para o desenvolvimento empresarial.</li>
      </ul>
      
      <h2>Como participar</h2>
      <p>Para ter acesso a todos os benefícios, basta ser associado da CDL Paulo Afonso. Empresários interessados podem entrar em contato através do nosso atendimento ou visitar nossa sede para mais informações sobre o processo de associação.</p>
      
      <p>Este programa representa mais um passo da CDL no compromisso de apoiar e fortalecer o comércio de Paulo Afonso, oferecendo ferramentas e oportunidades para o crescimento sustentável das empresas locais.</p>
    `,
    publishedAt: new Date(2025, 1, 10).toISOString(),
    image: null,
  },
  'certificado-digital-agiliza-processos-empresariais': {
    title: 'Certificado Digital agiliza processos empresariais em Paulo Afonso',
    excerpt: 'Associados da CDL podem emitir certificados digitais com condições especiais, facilitando transações online e reduzindo burocracias.',
    content: `
      <p>A CDL Paulo Afonso está facilitando o acesso ao Certificado Digital para empresas associadas, oferecendo condições especiais e um processo simplificado de emissão. O certificado digital é uma ferramenta essencial para modernizar os processos empresariais e garantir segurança nas transações eletrônicas.</p>
      
      <h2>Vantagens do Certificado Digital</h2>
      <p>Com o certificado digital, as empresas podem:</p>
      <ul>
        <li>Assinar documentos eletronicamente com validade jurídica</li>
        <li>Realizar transações bancárias online com segurança</li>
        <li>Emitir notas fiscais eletrônicas</li>
        <li>Acessar sistemas governamentais de forma mais ágil</li>
        <li>Reduzir custos com papel e processos físicos</li>
      </ul>
      
      <h2>Condições especiais para associados</h2>
      <p>Associados da CDL Paulo Afonso têm acesso a:</p>
      <ul>
        <li>Valores reduzidos na emissão e renovação</li>
        <li>Atendimento prioritário e personalizado</li>
        <li>Suporte técnico especializado</li>
        <li>Processo simplificado de documentação</li>
      </ul>
      
      <h2>Como adquirir</h2>
      <p>O processo pode ser realizado de duas formas: online com CNH ou presencialmente em nossa sede. Para mais informações e solicitar uma proposta personalizada, entre em contato conosco através do WhatsApp ou visite nossa página de Certificado Digital.</p>
      
      <p>A digitalização dos processos empresariais é uma tendência irreversível, e a CDL está comprometida em facilitar essa transição para seus associados, oferecendo soluções práticas e acessíveis.</p>
    `,
    publishedAt: new Date(2025, 1, 5).toISOString(),
    image: null,
  },
  'campanha-natal-premiado-2025-inscricoes-abertas': {
    title: 'Campanha Natal Premiado 2025: Inscrições abertas para lojistas',
    excerpt: 'A maior campanha de fidelização do comércio de Paulo Afonso está com inscrições abertas. Participe e movimente suas vendas no final do ano.',
    content: `
      <p>A CDL Paulo Afonso anuncia a abertura das inscrições para a Campanha Natal Premiado 2025, uma das maiores ações de fidelização e movimentação do comércio local. A campanha oferece aos clientes a oportunidade de concorrer a prêmios enquanto movimenta o comércio de Paulo Afonso.</p>
      
      <h2>Sobre a campanha</h2>
      <p>A Campanha Natal Premiado é uma iniciativa tradicional da CDL que visa:</p>
      <ul>
        <li>Incentivar as compras no comércio local</li>
        <li>Fidelizar clientes através de sorteios de prêmios</li>
        <li>Movimentar as vendas no período de fim de ano</li>
        <li>Fortalecer a economia local</li>
      </ul>
      
      <h2>Como funciona</h2>
      <p>Clientes que realizam compras em estabelecimentos participantes recebem cupons para participar dos sorteios. Quanto mais compras, mais chances de ganhar prêmios valiosos. A campanha movimenta milhares de consumidores e gera resultados significativos para os lojistas participantes.</p>
      
      <h2>Benefícios para lojistas</h2>
      <p>Lojistas que participam da campanha têm acesso a:</p>
      <ul>
        <li>Aumento significativo no volume de vendas</li>
        <li>Maior visibilidade no mercado local</li>
        <li>Fidelização de clientes</li>
        <li>Suporte da CDL na divulgação e execução</li>
      </ul>
      
      <h2>Inscrições</h2>
      <p>As inscrições estão abertas para todos os lojistas associados da CDL Paulo Afonso. Para participar, entre em contato conosco através do nosso atendimento ou visite nossa sede. Não perca esta oportunidade de movimentar suas vendas e fortalecer seu negócio!</p>
      
      <p>A Campanha Natal Premiado é mais uma forma da CDL apoiar o comércio local, criando oportunidades de crescimento e fortalecimento para as empresas de Paulo Afonso.</p>
    `,
    publishedAt: new Date(2025, 0, 28).toISOString(),
    image: null,
  },
};

export async function generateStaticParams() {
  return Object.keys(mockNewsContent).map((slug) => ({ slug }));
}

async function getNews(slug: string) {
  // Primeiro verifica se é uma notícia mockada
  if (mockNewsContent[slug]) {
    return {
      ...mockNewsContent[slug],
      slug,
      id: slug,
    };
  }

  // Se não for mockada, tenta buscar da API
  const base = getApiBase();
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return null;
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/news/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await getNews(slug);
  if (!news) notFound();
  
  return (
    <article className="py-12 sm:py-16">
      <div className="container-cdl max-w-3xl">
        <Link href="/noticias" className="text-sm text-cdl-blue hover:underline mb-6 inline-block">
          ← Voltar às notícias
        </Link>
        
        {news.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cdl-gray mb-8 shadow-lg">
            <Image
              src={news.image.startsWith('http') ? news.image : `${getApiBase()}${news.image}`}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}
        
        <div className="mb-6">
          {news.publishedAt && (
            <time className="text-sm font-medium text-cdl-blue mb-3 block" dateTime={news.publishedAt}>
              {new Date(news.publishedAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{news.title}</h1>
        </div>
        
        <div className="mt-8 prose prose-cdl max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
        
        {/* Links relacionados */}
        {news.links && Array.isArray(news.links) && news.links.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Links relacionados</h2>
            <div className="flex flex-wrap gap-3">
              {news.links.map((link: { label: string; url: string; type: 'download' | 'external' }, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                  download={link.type === 'download' ? true : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-cdl-blue text-cdl-blue font-medium hover:bg-cdl-blue hover:text-white transition-colors"
                >
                  {link.type === 'download' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                  {link.label || link.url}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
