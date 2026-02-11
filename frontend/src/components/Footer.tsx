import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/institucional/diretoria', label: 'Diretoria' },
  { href: '/institucional/nossa-cidade', label: 'Nossa Cidade' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/atendimento', label: 'Atendimento' },
  { href: '/area-associado', label: 'Área do Associado' },
  { href: '/associe-se', label: 'Associe-se' },
];

export function Footer() {
  return (
    <footer className="bg-cdl-blue-dark text-white mt-auto">
      <div className="container-cdl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xl font-bold text-white">CDL Paulo Afonso</p>
            <p className="mt-2 text-sm text-blue-200/90">
              Comunidade empresarial. Serviços, networking e apoio ao comércio local.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/90">Links</h3>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/90 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/90">Contato</h3>
            <p className="mt-3 text-sm text-white/90">Paulo Afonso - BA</p>
            <p className="text-sm text-white/90">
              <a href="mailto:cdlpauloafonso@hotmail.com" className="hover:text-white transition-colors">
                cdlpauloafonso@hotmail.com
              </a>
            </p>
            <p className="mt-2 text-sm text-white/90">
              <a href="tel:+557532814942" className="hover:text-white transition-colors">
                (75) 3281-4942
              </a>
            </p>
            <p className="text-sm text-white/90">
              <a href="tel:+557532816997" className="hover:text-white transition-colors">
                (75) 3281-6997
              </a>
            </p>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 text-center text-sm text-white/70">
          © {new Date().getFullYear()} CDL Paulo Afonso. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
