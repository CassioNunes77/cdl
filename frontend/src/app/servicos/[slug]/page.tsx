import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return [{ slug: '_' }];
}

async function getService(slug: string) {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return null;
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/services/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Excluir rotas estáticas que têm suas próprias páginas
  if (slug === 'auditorio' || slug === 'certificado-digital') {
    notFound();
  }
  
  const service = await getService(slug);
  if (!service) notFound();
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-3xl">
        <Link href="/servicos" className="text-sm text-cdl-blue hover:underline mb-6 inline-block">
          ← Voltar aos serviços
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
        <div className="mt-6 prose prose-cdl max-w-none">
          <p className="text-cdl-gray-text">{service.description}</p>
        </div>
      </div>
    </div>
  );
}
