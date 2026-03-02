import { NoticiaDetailClient } from './NoticiaDetailClient';
import { listNewsSlugsAtBuild } from '@/lib/firestore-build';

export async function generateStaticParams() {
  try {
    const slugs = await listNewsSlugsAtBuild();
    if (slugs.length === 0) return [{ slug: '__fallback__' }];
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [{ slug: '__fallback__' }];
  }
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NoticiaDetailClient slug={slug} />;
}
