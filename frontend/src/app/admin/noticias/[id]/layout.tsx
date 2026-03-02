export async function generateStaticParams() {
  return [{ id: 'nova' }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
