async function getPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api/pages/nossa-cidade`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function NossaCidadePage() {
  const page = await getPage();
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <h1 className="text-3xl font-bold text-gray-900">Nossa Cidade</h1>
        {page?.excerpt && (
          <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">{page.excerpt}</p>
        )}
        <div className="mt-8 prose prose-cdl max-w-none">
          {page?.content ? (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <p className="text-cdl-gray-text">
              Panorama econômico local, indicadores do comércio e oportunidades em Paulo Afonso. 
              Conteúdo em atualização.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
