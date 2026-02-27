'use client';

import { useEffect, useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { getSettings } from '@/lib/firestore';

const DEFAULT_TITLE = 'A CDL que faz sua empresa vender mais, gastar menos e crescer mais rápido';
const DEFAULT_SUBTITLE = 'Comunidade empresarial de Paulo Afonso. Serviços, networking e apoio ao comércio local.';

type HeroSlide = {
  title: string;
  subtitle: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
};

const INITIAL_SLIDES: HeroSlide[] = [
    {
      title: DEFAULT_TITLE,
      subtitle: DEFAULT_SUBTITLE,
      primaryButton: { text: 'Associe-se', href: '/associe-se' },
      secondaryButton: { text: 'Conheça os serviços', href: '/servicos' },
    },
    {
      title: 'Certificado Digital SPC',
      subtitle: 'Transações virtuais, segurança real. Suas operações digitais muito mais seguras.',
      primaryButton: { text: 'Saiba mais', href: '/servicos/certificado-digital' },
      secondaryButton: { text: 'Associe-se', href: '/associe-se' },
    },
];

export function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>(INITIAL_SLIDES);

  useEffect(() => {
    getSettings()
      .then((settings) => {
        const title = settings.hero_title ?? DEFAULT_TITLE;
        const subtitle = settings.hero_subtitle ?? DEFAULT_SUBTITLE;
        setSlides((prev: HeroSlide[]) => [
          {
            ...prev[0],
            title,
            subtitle,
          },
          prev[1],
        ]);
      })
      .catch(() => {});
  }, []);

  return <HeroCarousel slides={slides} autoSlideInterval={5000} />;
}
