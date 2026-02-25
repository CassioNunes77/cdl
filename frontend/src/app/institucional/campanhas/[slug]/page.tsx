import { listCampaignIdsAtBuild } from '@/lib/firestore-build';
import { CampaignPageClient } from './CampaignPageClient';

export async function generateStaticParams() {
  const ids = await listCampaignIdsAtBuild();
  if (ids.length === 0) return [{ slug: '__fallback__' }];
  return ids.map((slug) => ({ slug }));
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CampaignPageClient slug={slug} />;
}
