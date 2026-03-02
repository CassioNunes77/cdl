import Image from 'next/image';

type About = {
  title: string;
  description: string;
  photo: string | null;
};

function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
}

async function getAbout(): Promise<About> {
  const base = getApiBase();
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
    return { title: '', description: '', photo: null };
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/about`, { next: { revalidate: 60 } });
    if (!res.ok) return { title: '', description: '', photo: null };
    return res.json();
  } catch {
    return { title: '', description: '', photo: null };
  }
}

export default async function CDLPauloAfonsoPage() {
  const about = await getAbout();

  return (
    <div className="container-cdl py-8 sm:py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          {about.title || 'CDL Paulo Afonso'}
        </h1>

        {about.photo && (
          <div className="mb-8">
            <Image
              src={about.photo.startsWith('http') ? about.photo : `${getApiBase()}${about.photo}`}
              alt={about.title || 'CDL Paulo Afonso'}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              unoptimized={about.photo.startsWith('http')}
            />
          </div>
        )}

        <div className="prose-cdl max-w-none">
          {about.description ? (
            <div dangerouslySetInnerHTML={{ __html: about.description.replace(/\n/g, '<br />') }} />
          ) : (
            <div className="space-y-6">
              <p>
                A Câmara de Dirigentes Lojistas de Paulo Afonso é uma associação de classe, sem fins lucrativos, sem filiação política, partidária ou religiosa, com sede e foro na cidade de Salvador.
              </p>
              
              <p>
                A entidade aproxima os diversos segmentos varejistas para tratar de interesses comuns ao comércio, propiciando um clima de cooperação e troca de informações e idéias.
              </p>
              
              <p>
                A CDL de Paulo Afonso, fundada em 02 de dezembro de 2000, é uma entidade Civil sem fins lucrativos, com sede na Rua Monsenhor Magalhães, 214, nesta cidade de Paulo Afonso, no estado da Bahia. O processo de formação da Câmara de Dirigentes Lojistas de Paulo Afonso teve prosseguimento com o envio, ao diretor-executivo da Federação de Câmaras de Dirigentes Lojistas da Bahia, Hamilton Dantas, da chapa única de 15 membros que se habilitou para eleição da primeira diretoria e do conselho fiscal da CDL local.
              </p>
              
              <p>
                A iniciativa coube a um grupo de comerciantes, encabeçado, entre outros, por Francisco Rodrigues Neto e José Manoel do Nascimento, que contou com o estimulo do diretor distrital da CDL de Ribeira do Pombal, José Raimundo Gonçalves de Jesus.
              </p>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Tem por finalidade:</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>desenvolver o movimento lojista;</li>
                  <li>criar clima de harmonia na comunidade lojista local;</li>
                  <li>cooperar com as autoridades constituídas, entidades congêneres e a população;</li>
                  <li>promover a melhoria de conhecimentos da comunidade lojista;</li>
                  <li>manter, com exclusividade, o Serviço de Proteção ao Crédito (S.P.C.), na defesa do comércio crediarista.</li>
                </ul>
              </div>
              
              <p>
                Sua Diretoria e Conselho Fiscal são eleitos pelo período de três anos, podendo ser reeleitos por mais um período consecutivo apenas. Está composta de: Presidente e Vice-Presidente - 1º e 2º Secretários - 1º e 2º Tesoureiros - Diretor do SPC - Diretor da CECOB - Diretor Social.
              </p>
              
              <p>
                O Conselho Fiscal terá três membros efetivos e três suplentes. Havendo dissolução da CDL, todo o patrimônio imóvel e móvel será repassado para a Federação das Câmaras de Dirigentes Lojistas do Estado da Bahia. As pendências judiciais deverão ser resolvidas no fórum deste município. Os sócios não respondem solidária, nem subsidiariamente pelas obrigações contraídas em nome da CDL.
              </p>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Campanhas e Eventos</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Liquida Paulo Afonso</h3>
                    <p className="text-gray-700">Campanha realizada anualmente, onde várias empresas entram em liquidação.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">Natal Premiado</h3>
                    <p className="text-gray-700">Campanha que visa dar oportunidade aos clientes que compraram o ano inteiro no comércio local de serem premiados.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">Prêmio Mérito Lojista</h3>
                    <p className="text-gray-700">Premiando anualmente as empresas que se destacaram em seus segmentos.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
