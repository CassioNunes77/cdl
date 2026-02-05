import Link from 'next/link';

export function CTA() {
  return (
    <section className="bg-cdl-blue text-white py-16 sm:py-20">
      <div className="container-cdl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Você não está sozinho como empresário
        </h2>
        <p className="mt-4 text-blue-100/95 max-w-xl mx-auto">
          Segurança para vender, apoio institucional, economia de custos e acesso a uma estrutura profissional. 
          Faça parte da comunidade que impulsiona o comércio de Paulo Afonso.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/associe-se"
            className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-cdl-blue hover:bg-blue-50 transition-colors"
          >
            Associe-se
          </Link>
          <Link
            href="/atendimento"
            className="inline-flex items-center rounded-lg border-2 border-white/80 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </section>
  );
}
