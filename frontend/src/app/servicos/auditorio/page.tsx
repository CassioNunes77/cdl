'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAuditorium } from '@/lib/firestore';
import { WhatsAppContactButton } from './WhatsAppContactButton';

const DEFAULT_TITLE = 'Auditório para Eventos';
const DEFAULT_DESCRIPTION = 'Realize seus eventos com conforto e tecnologia em um espaço moderno e equipado. Nosso auditório oferece infraestrutura completa para apresentações, palestras, workshops e transmissões de alta qualidade, proporcionando a melhor experiência para você e seus convidados.';
const DEFAULT_INFRASTRUCTURE = [
  'Sistema de som e iluminação profissional',
  'Equipamentos de projeção e telas de alta definição',
  'Espaço climatizado e confortável',
  'Capacidade para eventos de diversos portes',
];

export default function AuditorioPage() {
  const [data, setData] = useState<{
    title: string;
    description: string;
    photo: string | null;
    infrastructureTitle: string;
    infrastructureItems: string[];
  } | null>(null);

  useEffect(() => {
    getAuditorium()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const title = data?.title || DEFAULT_TITLE;
  const description = data?.description || DEFAULT_DESCRIPTION;
  const photo = data?.photo;
  const infrastructureTitle = data?.infrastructureTitle || 'Infraestrutura';
  const infrastructureItems = data?.infrastructureItems?.length
    ? data.infrastructureItems
    : DEFAULT_INFRASTRUCTURE;

  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          {title}
        </h1>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          {photo ? (
            <div className="relative w-full h-64 sm:h-96">
              <Image
                src={photo}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                unoptimized={photo.startsWith('http')}
              />
            </div>
          ) : (
            <div className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-cdl-blue to-cdl-blue-dark">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="absolute bottom-4 left-4 right-4 text-white/80 text-sm text-center">
                Adicione uma foto no painel administrativo
              </p>
            </div>
          )}
        </div>

        <div className="prose prose-cdl max-w-none">
          <p className="text-lg text-cdl-gray-text leading-relaxed">
            {description}
          </p>

          <div className="mt-8 p-6 bg-cdl-gray rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{infrastructureTitle}</h2>
            <ul className="space-y-2 text-cdl-gray-text">
              {infrastructureItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <WhatsAppContactButton message="Olá! Gostaria de contratar o Auditório para Eventos." />
        </div>
      </div>
    </div>
  );
}
