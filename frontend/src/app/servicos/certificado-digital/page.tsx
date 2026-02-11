import Link from 'next/link';
import { WhatsAppContactButton } from './WhatsAppContactButton';

export const dynamic = 'force-static';

export default function CertificadoDigitalPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-4xl">
        <Link href="/servicos" className="text-sm text-cdl-blue hover:underline mb-6 inline-block">
          ← Voltar aos serviços
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Certificado Digital
        </h1>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-cdl-blue to-cdl-blue-dark">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-white/80 text-sm text-center">
              Imagem do certificado digital será adicionada aqui
            </p>
          </div>
        </div>

        <div className="prose prose-cdl max-w-none">
          <p className="text-lg text-cdl-gray-text leading-relaxed">
            Obtenha facilidade e agilidade na emissão e renovação do seu Certificado Digital. 
            Garantimos um atendimento especializado, sem burocracias, para simplificar o processo 
            e oferecer segurança nas transações eletrônicas.
          </p>

          <div className="mt-8 p-6 bg-cdl-gray rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Como funciona</h2>
            <p className="text-cdl-gray-text mb-4">
              Você pode realizar o processo de forma rápida e prática de duas maneiras:
            </p>
            <ul className="space-y-3 text-cdl-gray-text">
              <li className="flex items-start gap-2">
                <span className="text-cdl-blue mt-1 font-bold">•</span>
                <span><strong>Online com CNH:</strong> Faça tudo pela internet utilizando sua Carteira Nacional de Habilitação como documento de identificação.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cdl-blue mt-1 font-bold">•</span>
                <span><strong>Presencialmente:</strong> Agende um horário e faça o atendimento pessoalmente em nossa sede.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Documentos necessários</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pessoa Física</h3>
              <ul className="space-y-2 text-cdl-gray-text">
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>Carteira Nacional de Habilitação (CNH)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>RG (Registro Geral)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>E-mail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>Endereço completo</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pessoa Jurídica (PJ)</h3>
              <ul className="space-y-2 text-cdl-gray-text">
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>Carteira Nacional de Habilitação (CNH) do responsável</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>RG (Registro Geral) do responsável</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>ATA ou Estatuto da empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>Cartão CNPJ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>E-mail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cdl-blue mt-1">✓</span>
                  <span>Endereço completo da empresa</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-cdl-gray-text italic">
                <strong>Nota:</strong> No caso de Microempreendedor Individual (MEI), apresentar apenas o comprovante do MEI.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <WhatsAppContactButton message="Olá! Gostaria de solicitar uma proposta personalizada para Certificado Digital." />
        </div>
      </div>
    </div>
  );
}
