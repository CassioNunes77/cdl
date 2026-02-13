import Link from 'next/link';

export const dynamic = 'force-static';

const highlights = [
  { label: 'IDH', value: '0,674', year: '2010', source: 'PNUD' },
  { label: 'População', value: '119.213', year: 'Estimativa 2024', source: 'IBGE' },
  { label: 'PIB per capita', value: 'R$ 33.262,53', year: '2021', source: 'IBGE' },
  { label: 'Taxa de Escolarização', value: '95,5%', year: '6 a 14 anos (2022)', source: 'IBGE' },
];

const capitalHumano = [
  { value: '119.213', label: 'População Total' },
  { value: '16.540', label: 'Empregados Formais' },
  { value: '7.158', label: 'Estudantes de Ensino Superior' },
  { value: '7.546', label: 'Empresas Ativas' },
];

export default function IndicadoresEconomicosPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-6xl">
        <div className="mb-10">
          <Link href="/" className="text-sm text-cdl-blue hover:underline mb-4 inline-block">
            ← Voltar ao início
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Indicadores Econômicos
          </h1>
          <p className="text-lg text-cdl-gray-text">
            Dados socioeconômicos de Paulo Afonso que refletem o dinamismo e potencial econômico da cidade.
          </p>
        </div>

        {/* Indicadores em Destaque */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Indicadores em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 bg-white hover:border-cdl-blue/30 hover:shadow-md transition-all"
              >
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-cdl-gray-text mb-1">{item.label}</h3>
                  <p className="text-3xl font-bold text-cdl-blue">{item.value}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-cdl-gray-text">{item.year}</p>
                  <p className="text-xs text-cdl-gray-text mt-1">Fonte: {item.source}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capital Humano */}
        <section className="mb-12">
          <div className="mb-8 p-8 rounded-xl bg-gradient-to-r from-cdl-blue/10 to-cdl-blue-dark/10 border-2 border-cdl-blue/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Capital Humano</h2>
            <p className="text-lg text-cdl-gray-text">
              Profissionais qualificados para impulsionar sua empresa
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capitalHumano.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 bg-white hover:border-cdl-blue/30 hover:shadow-md transition-all text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-cdl-blue mb-2">
                  {item.value}
                </p>
                <p className="text-sm font-medium text-cdl-gray-text">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Análise Comparativa */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Análise Comparativa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 mb-4">PIB per capita (2021)</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cdl-gray-text">Paulo Afonso</span>
                    <span className="font-medium text-gray-900">R$ 33.262,53</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cdl-blue h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cdl-gray-text">Juazeiro</span>
                    <span className="font-medium text-gray-900">R$ 28.145,20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cdl-gray-text">Teixeira de Freitas</span>
                    <span className="font-medium text-gray-900">R$ 25.890,10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-cdl-gray-text mt-4">Fonte: IBGE</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 mb-4">Rendimento Domiciliar per capita (2022)</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cdl-gray-text">Paulo Afonso</span>
                    <span className="font-medium text-gray-900">R$ 1.245,00</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cdl-blue h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cdl-gray-text">Juazeiro</span>
                    <span className="font-medium text-gray-900">R$ 1.180,00</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cdl-gray-text">Teixeira de Freitas</span>
                    <span className="font-medium text-gray-900">R$ 1.100,00</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-cdl-gray-text mt-4">Fonte: IBGE</p>
            </div>
          </div>
        </section>

        {/* Dados Completos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dados Completos</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="bg-cdl-gray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Indicador</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Paulo Afonso</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Juazeiro</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Teixeira de Freitas</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Fonte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">População (2024)</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">119.213</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">218.162</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">162.438</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">IBGE</td>
                </tr>
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">PIB per capita (2021)</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">R$ 33.262,53</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">R$ 28.145,20</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">R$ 25.890,10</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">IBGE</td>
                </tr>
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">IDH (2010)</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">0,674</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">0,677</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">0,682</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">PNUD</td>
                </tr>
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">Taxa de Escolarização 6-14 anos (2022)</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">95,5%</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">94,2%</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">93,8%</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">IBGE</td>
                </tr>
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">Empregados Formais</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">16.540</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">28.450</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">22.180</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">RAIS</td>
                </tr>
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">Estudantes de Ensino Superior</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">7.158</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">12.450</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">9.820</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">INEP</td>
                </tr>
                <tr className="hover:bg-cdl-gray/50">
                  <td className="px-6 py-4 text-sm text-gray-900">Empresas Ativas</td>
                  <td className="px-6 py-4 text-sm font-medium text-cdl-blue">7.546</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">13.280</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">10.450</td>
                  <td className="px-6 py-4 text-sm text-cdl-gray-text">RFB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Infraestrutura */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Infraestrutura e Saneamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 mb-4">Saneamento Básico (2022)</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-cdl-gray-text">Água encanada</span>
                  <span className="font-medium text-gray-900">98,2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cdl-gray-text">Esgoto sanitário</span>
                  <span className="font-medium text-gray-900">92,5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cdl-gray-text">Coleta de lixo</span>
                  <span className="font-medium text-gray-900">99,1%</span>
                </div>
              </div>
              <p className="text-xs text-cdl-gray-text mt-4">Fonte: IBGE</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 mb-4">Taxa de Urbanização</h3>
              <div className="text-center">
                <p className="text-4xl font-bold text-cdl-blue mb-2">96,8%</p>
                <p className="text-sm text-cdl-gray-text">(2022)</p>
              </div>
              <p className="text-xs text-cdl-gray-text mt-4">Fonte: IBGE</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 mb-4">Distâncias até Capitais</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cdl-gray-text">Salvador</span>
                  <span className="font-medium text-gray-900">450 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cdl-gray-text">Recife</span>
                  <span className="font-medium text-gray-900">380 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cdl-gray-text">Aracaju</span>
                  <span className="font-medium text-gray-900">280 km</span>
                </div>
              </div>
              <p className="text-xs text-cdl-gray-text mt-4">Fonte: IBGE</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
