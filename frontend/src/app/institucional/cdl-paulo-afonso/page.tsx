import Image from 'next/image';

type About = {
  title: string;
  description: string;
  photo: string | null;
};

function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
}

async function getAbout(): Promise<About> {
  const base = getApiBase();
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
    return { title: '', description: '', photo: null };
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/about`, { next: { revalidate: 60 } });
    if (!res.ok) return { title: '', description: '', photo: null };
    return res.json();
  } catch {
    return { title: '', description: '', photo: null };
  }
}

export default async function CDLPauloAfonsoPage() {
  const about = await getAbout();

  return (
    <div className="container-cdl py-8 sm:py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          {about.title || 'CDL Paulo Afonso'}
        </h1>

        {about.photo && (
          <div className="mb-8">
            <Image
              src={about.photo.startsWith('http') ? about.photo : `${getApiBase()}${about.photo}`}
              alt={about.title || 'CDL Paulo Afonso'}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              unoptimized={about.photo.startsWith('http')}
            />
          </div>
        )}

        <div className="prose-cdl max-w-none">
          {about.description ? (
            <div dangerouslySetInnerHTML={{ __html: about.description.replace(/\n/g, '<br />') }} />
          ) : (
            <p className="text-cdl-gray-text">Conteúdo em breve...</p>
          )}
        </div>
      </div>
    </div>
  );
}
