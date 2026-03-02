'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCertificadoDigital } from '@/lib/firestore';
import { WhatsAppContactButton } from './WhatsAppContactButton';

const DEFAULTS = {
  title: 'Certificado Digital',
  description: 'Obtenha facilidade e agilidade na emissão e renovação do seu Certificado Digital. Garantimos um atendimento especializado, sem burocracias, para simplificar o processo e oferecer segurança nas transações eletrônicas.',
  section1Title: 'Como funciona',
  section1Content: `Você pode realizar o processo de forma rápida e prática de duas maneiras:

• Online com CNH: Faça tudo pela internet utilizando sua Carteira Nacional de Habilitação como documento de identificação.

• Presencialmente: Agende um horário e faça o atendimento pessoalmente em nossa sede.`,
  section2Title: 'Benefício para Associados',
  section2Content: 'Associados da CDL têm valor reduzido no Certificado Digital! Aproveite este benefício exclusivo e garanta segurança nas suas transações eletrônicas com condições especiais.',
  section3Title: 'Documentos necessários',
  section3Content: `Pessoa Física:
• Carteira Nacional de Habilitação (CNH)
• RG (Registro Geral)
• E-mail
• Endereço completo

Pessoa Jurídica (PJ):
• CNH do responsável
• RG do responsável
• ATA ou Estatuto da empresa
• Cartão CNPJ
• E-mail
• Endereço completo da empresa

Nota: No caso de MEI, apresentar apenas o comprovante do MEI.`,
};

function renderContent(text: string) {
  if (!text.trim()) return null;
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br />');
  return (
    <div
      className="text-cdl-gray-text whitespace-pre-line"
      dangerouslySetInnerHTML={{ __html: escaped }}
    />
  );
}

export default function CertificadoDigitalPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getCertificadoDigital>> | null>(null);

  useEffect(() => {
    getCertificadoDigital()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const title = data?.title || DEFAULTS.title;
  const description = data?.description || DEFAULTS.description;
  const photo = data?.photo;
  const section1Title = data?.section1Title || DEFAULTS.section1Title;
  const section1Content = data?.section1Content || DEFAULTS.section1Content;
  const section2Title = data?.section2Title || DEFAULTS.section2Title;
  const section2Content = data?.section2Content || DEFAULTS.section2Content;
  const section3Title = data?.section3Title || DEFAULTS.section3Title;
  const section3Content = data?.section3Content || DEFAULTS.section3Content;

  const sections = [
    { title: section1Title, content: section1Content, className: 'bg-cdl-gray' },
    { title: section2Title, content: section2Content, className: 'bg-gradient-to-r from-cdl-blue/10 to-cdl-blue-dark/10 border-2 border-cdl-blue/30' },
    { title: section3Title, content: section3Content, className: 'bg-white' },
  ];

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

          {sections.map((section, i) => (
            (section.title || section.content) && (
              <div
                key={i}
                className={`mt-8 p-6 rounded-xl border border-gray-200 ${section.className}`}
              >
                {section.title && (
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                )}
                {renderContent(section.content)}
              </div>
            )
          ))}
        </div>

        <div className="mt-10">
          <WhatsAppContactButton
            message="Olá! Gostaria de solicitar uma proposta personalizada para Certificado Digital."
            phoneNumber="7532816997"
          />
        </div>
      </div>
    </div>
  );
}
