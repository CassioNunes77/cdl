import Link from 'next/link';

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

  return (
    <section className="relative bg-gradient-to-br from-cdl-blue via-cdl-blue-dark to-cdl-blue overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" aria-hidden="true" />
      <div className="container-cdl relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight animate-fade-in">
            {title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100/95 leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/associe-se" className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-cdl-blue shadow-sm hover:bg-blue-50 transition-colors">
              Associe-se
            </Link>
            <Link
              href="/servicos"
              className="inline-flex items-center rounded-lg border-2 border-white/80 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Conheça os serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
