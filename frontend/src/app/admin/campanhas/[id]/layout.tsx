export async function generateStaticParams() {
  return [
    { id: 'cafe-com-elas' },
    { id: 'sao-joao-comercio' },
    { id: 'natal-premiado-cdl' },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
