import Link from 'next/link';

async function getServices() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return [];
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ServicosPage() {
  const services = await getServices();
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
        <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">
          Hub de serviços para empresas: SPC, certificado digital, saúde, coworking e mais. 
          Apoio ao crescimento e competitividade do comércio local.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((s: { id: string; title: string; slug: string; description: string }) => (
              <Link
                key={s.id}
                href={`/servicos/${s.slug}`}
                className="block p-6 rounded-xl border border-gray-200 bg-white hover:border-cdl-blue/30 hover:shadow-md transition-all"
              >
                <h2 className="font-semibold text-lg text-gray-900 hover:text-cdl-blue">{s.title}</h2>
                <p className="mt-2 text-cdl-gray-text">{s.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-cdl-blue">
                  Saiba mais
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))
          ) : (
            <p className="text-cdl-gray-text col-span-full">Nenhum serviço cadastrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
