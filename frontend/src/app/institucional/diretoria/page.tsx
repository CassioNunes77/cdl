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
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <h1 className="text-3xl font-bold text-gray-900">Diretoria</h1>
        {page?.excerpt && (
          <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">{page.excerpt}</p>
        )}
        <div className="mt-8 prose prose-cdl max-w-none">
          {page?.content && (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          )}
        </div>
        <DirectorsList />
      </div>
    </div>
  );
}
