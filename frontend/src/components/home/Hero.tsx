import { HeroCarousel } from './HeroCarousel';

async function getSettings(): Promise<Record<string, string>> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return {};
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export async function Hero() {
  const settings = await getSettings();
  const title = settings.hero_title ?? 'A CDL que faz sua empresa vender mais, gastar menos e crescer mais rápido';
  const subtitle =
    settings.hero_subtitle ??
    'Comunidade empresarial de Paulo Afonso. Serviços, networking e apoio ao comércio local.';

  const slides = [
    {
      title,
      subtitle,
      primaryButton: {
        text: 'Associe-se',
        href: '/associe-se',
      },
      secondaryButton: {
        text: 'Conheça os serviços',
        href: '/servicos',
      },
    },
    {
      title: 'Certificado Digital SPC',
      subtitle: 'Transações virtuais, segurança real. Suas operações digitais muito mais seguras.',
      primaryButton: {
        text: 'Saiba mais',
        href: '/servicos/certificado-digital',
      },
      secondaryButton: {
        text: 'Associe-se',
        href: '/associe-se',
      },
    },
  ];

  return <HeroCarousel slides={slides} autoSlideInterval={5000} />;
}
