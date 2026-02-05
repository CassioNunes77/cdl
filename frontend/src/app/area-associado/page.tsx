import Link from 'next/link';

async function getPage() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return null;
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/pages/area-associado`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AreaAssociadoPage() {
  const page = await getPage();
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <h1 className="text-3xl font-bold text-gray-900">Área do Associado</h1>
        {page?.excerpt && (
          <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">{page.excerpt}</p>
        )}
        <div className="mt-8 prose prose-cdl max-w-none">
          {page?.content ? (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <>
              <p className="text-cdl-gray-text">
                Benefícios e serviços exclusivos para associados CDL Paulo Afonso.
              </p>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Acesso a serviços empresariais (SPC, certificado digital, saúde, etc.)</li>
                <li>• Networking com outros empresários da região</li>
                <li>• Representação e defesa do comércio</li>
                <li>• Informações e apoio ao desenvolvimento do seu negócio</li>
              </ul>
              <p className="mt-8">
                <Link href="/associe-se" className="btn-primary">
                  Associe-se
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
