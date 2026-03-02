export async function generateStaticParams() {
  return [{ id: 'novo' }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
