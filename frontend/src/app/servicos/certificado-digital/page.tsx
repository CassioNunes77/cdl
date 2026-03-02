'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCertificadoDigital } from '@/lib/firestore';
import { WhatsAppContactButton } from './WhatsAppContactButton';

const DEFAULTS = {
  title: 'Certificado Digital',
  description: 'Obtenha facilidade e agilidade na emissão e renovação do seu Certificado Digital. Garantimos um atendimento especializado, sem burocracias, para simplificar o processo e oferecer segurança nas transações eletrônicas.',
  howItWorksTitle: 'Como funciona',
  howItWorksIntro: 'Você pode realizar o processo de forma rápida e prática de duas maneiras:',
  howItWorksItems: [
    'Online com CNH: Faça tudo pela internet utilizando sua Carteira Nacional de Habilitação como documento de identificação.',
    'Presencialmente: Agende um horário e faça o atendimento pessoalmente em nossa sede.',
  ],
  benefitTitle: 'Benefício para Associados',
  benefitDescription: 'Associados da CDL têm valor reduzido no Certificado Digital! Aproveite este benefício exclusivo e garanta segurança nas suas transações eletrônicas com condições especiais.',
  docsTitle: 'Documentos necessários',
  docsPfTitle: 'Pessoa Física',
  docsPfItems: ['Carteira Nacional de Habilitação (CNH)', 'RG (Registro Geral)', 'E-mail', 'Endereço completo'],
  docsPjTitle: 'Pessoa Jurídica (PJ)',
  docsPjItems: [
    'Carteira Nacional de Habilitação (CNH) do responsável',
    'RG (Registro Geral) do responsável',
    'ATA ou Estatuto da empresa',
    'Cartão CNPJ',
    'E-mail',
    'Endereço completo da empresa',
  ],
  docsPjNote: 'Nota: No caso de Microempreendedor Individual (MEI), apresentar apenas o comprovante do MEI.',
};

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
  const howItWorksTitle = data?.howItWorksTitle || DEFAULTS.howItWorksTitle;
  const howItWorksIntro = data?.howItWorksIntro || DEFAULTS.howItWorksIntro;
  const howItWorksItems = data?.howItWorksItems?.length ? data.howItWorksItems : DEFAULTS.howItWorksItems;
  const benefitTitle = data?.benefitTitle || DEFAULTS.benefitTitle;
  const benefitDescription = data?.benefitDescription || DEFAULTS.benefitDescription;
  const docsTitle = data?.docsTitle || DEFAULTS.docsTitle;
  const docsPfTitle = data?.docsPfTitle || DEFAULTS.docsPfTitle;
  const docsPfItems = data?.docsPfItems?.length ? data.docsPfItems : DEFAULTS.docsPfItems;
  const docsPjTitle = data?.docsPjTitle || DEFAULTS.docsPjTitle;
  const docsPjItems = data?.docsPjItems?.length ? data.docsPjItems : DEFAULTS.docsPjItems;
  const docsPjNote = data?.docsPjNote || DEFAULTS.docsPjNote;

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

          <div className="mt-8 p-6 bg-cdl-gray rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{howItWorksTitle}</h2>
            <p className="text-cdl-gray-text mb-4">{howItWorksIntro}</p>
            <ul className="space-y-3 text-cdl-gray-text">
              {howItWorksItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-cdl-blue/10 to-cdl-blue-dark/10 rounded-xl border-2 border-cdl-blue/30">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-cdl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefitTitle}</h3>
                <p className="text-cdl-gray-text">{benefitDescription}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{docsTitle}</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{docsPfTitle}</h3>
              <ul className="space-y-2 text-cdl-gray-text">
                {docsPfItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cdl-blue mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{docsPjTitle}</h3>
              <ul className="space-y-2 text-cdl-gray-text">
                {docsPjItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cdl-blue mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {docsPjNote && (
                <p className="mt-4 text-sm text-cdl-gray-text italic">
                  <strong>Nota:</strong> {docsPjNote}
                </p>
              )}
            </div>
          </div>
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
