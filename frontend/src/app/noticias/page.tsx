import Link from 'next/link';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function getNews() {
  try {
    const res = await fetch(`${API_URL}/api/news?limit=20`, { next: { revalidate: 60 } });
    if (!res.ok) return { items: [] };
    return res.json();
  } catch {
    return { items: [] };
  }
}

export default async function NoticiasPage() {
  const { items } = await getNews();
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <h1 className="text-3xl font-bold text-gray-900">Notícias</h1>
        <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">
          Acompanhe novidades do comércio, da CDL e da nossa comunidade.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.length > 0 ? (
            items.map((n: { id: string; title: string; slug: string; excerpt: string; image: string | null; publishedAt: string | null }) => (
              <Link
                key={n.id}
                href={`/noticias/${n.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-all"
              >
                {n.image ? (
                  <div className="relative aspect-video bg-cdl-gray">
                    <Image
                      src={n.image.startsWith('http') ? n.image : `${API_URL}${n.image}`}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-cdl-gray flex items-center justify-center">
                    <span className="text-4xl text-cdl-blue/30 font-bold">CDL</span>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-semibold text-gray-900 group-hover:text-cdl-blue">{n.title}</h2>
                  <p className="mt-2 text-sm text-cdl-gray-text line-clamp-2">{n.excerpt}</p>
                  {n.publishedAt && (
                    <time className="mt-3 block text-xs text-cdl-gray-text" dateTime={n.publishedAt}>
                      {new Date(n.publishedAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-cdl-gray-text col-span-full">Nenhuma notícia publicada ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
