import { DirectorsList } from './DirectorsList';

async function getPage() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return null;
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/pages/diretoria`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function DiretoriaPage() {
  const page = await getPage();
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-white to-cdl-gray/30">
      <div className="container-cdl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Diretoria
          </h1>
          {page?.excerpt ? (
            <p className="text-lg sm:text-xl text-cdl-gray-text max-w-3xl mx-auto">
              {page.excerpt}
            </p>
          ) : (
            <p className="text-lg sm:text-xl text-cdl-gray-text max-w-3xl mx-auto">
              Conheça os líderes que guiam a CDL Paulo Afonso em sua missão de fortalecer o comércio local e promover o desenvolvimento empresarial da nossa cidade.
            </p>
          )}
        </div>

        {/* Page Content */}
        {page?.content && (
          <div className="mt-8 prose prose-cdl max-w-none text-center mx-auto">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}

        {/* Directors List */}
        <DirectorsList />
      </div>
    </div>
  );
}
