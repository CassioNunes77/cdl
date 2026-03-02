import { listCarouselSlideIdsAtBuild } from '@/lib/firestore-build';

export async function generateStaticParams() {
  try {
    const ids = await listCarouselSlideIdsAtBuild();
    return [{ id: 'nova' as string }, ...ids.map((id) => ({ id }))];
  } catch {
    return [{ id: 'nova' }];
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
