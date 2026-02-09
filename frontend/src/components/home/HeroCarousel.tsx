'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Slide = {
  title: string;
  subtitle: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  bgGradient?: string;
};

type HeroCarouselProps = {
  slides: Slide[];
  autoSlideInterval?: number; // em milissegundos
};

export function HeroCarousel({ slides, autoSlideInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoSlideInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Retoma auto-play após 10 segundos de inatividade
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-br from-cdl-blue via-cdl-blue-dark to-cdl-blue overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[650px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" aria-hidden="true" />
      
      {/* Slides */}
      <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[650px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ease-in-out absolute inset-0 flex items-center ${
              index === currentIndex ? 'opacity-100 relative' : 'opacity-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <div className="container-cdl relative w-full py-16 sm:py-24 lg:py-32">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-blue-100/95 leading-relaxed">
                  {slide.subtitle}
                </p>
                {(slide.primaryButton || slide.secondaryButton) && (
                  <div className="mt-10 flex flex-wrap gap-4">
                    {slide.primaryButton && (
                      <Link
                        href={slide.primaryButton.href}
                        className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-cdl-blue shadow-sm hover:bg-blue-50 transition-colors"
                      >
                        {slide.primaryButton.text}
                      </Link>
                    )}
                    {slide.secondaryButton && (
                      <Link
                        href={slide.secondaryButton.href}
                        className="inline-flex items-center rounded-lg border-2 border-white/80 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                      >
                        {slide.secondaryButton.text}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      {slides.length > 1 && (
        <>
          {/* Botões anterior/próximo */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Slide anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Próximo slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores (dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
