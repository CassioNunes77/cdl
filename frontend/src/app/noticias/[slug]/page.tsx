import { NoticiaDetailClient } from './NoticiaDetailClient';
import { listNewsSlugsAtBuild } from '@/lib/firestore-build';

export async function generateStaticParams() {
  const slugs = await listNewsSlugsAtBuild();
  return slugs.map((slug) => ({ slug }));
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NoticiaDetailClient slug={slug} />;
}
