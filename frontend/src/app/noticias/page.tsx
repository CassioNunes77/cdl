import { NoticiasListClient } from './NoticiasListClient';

export default function NoticiasPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Últimas Notícias</h1>
          <p className="mt-4 text-lg text-cdl-gray-text max-w-2xl">
            Acompanhe novidades do comércio, da CDL e da nossa comunidade empresarial.
          </p>
        </div>
        <NoticiasListClient />
      </div>
    </div>
  );
}
