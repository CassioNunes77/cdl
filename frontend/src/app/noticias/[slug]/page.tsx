import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const getApiBase = () => process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function getNews(slug: string) {
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
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cdl-gray mb-8">
            <Image
              src={news.image.startsWith('http') ? news.image : `${getApiBase()}${news.image}`}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900">{news.title}</h1>
        {news.publishedAt && (
          <time className="mt-2 block text-cdl-gray-text" dateTime={news.publishedAt}>
            {new Date(news.publishedAt).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        )}
        <div className="mt-8 prose prose-cdl max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
      </div>
    </article>
  );
}
