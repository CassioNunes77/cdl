import Image from 'next/image';

const getApiBase = () => process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function getDirectors() {
  const base = getApiBase();
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) return [];
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/directors`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function DirectorsList() {
  const directors = await getDirectors();
  if (directors.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Nossa equipe</h2>
        <p className="text-cdl-gray-text">Informações da diretoria em breve.</p>
      </section>
    );
  }
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Nossa equipe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {directors.map((d: { id: string; name: string; role: string; photo: string | null; bio: string | null }) => (
          <div key={d.id} className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            {d.photo ? (
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-cdl-gray">
                <Image
                  src={d.photo.startsWith('http') ? d.photo : `${getApiBase()}${d.photo}`}
                  alt={d.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            ) : (
              <div className="w-32 h-32 mx-auto rounded-full bg-cdl-blue/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-cdl-blue">{d.name.charAt(0)}</span>
              </div>
            )}
            <h3 className="mt-4 font-semibold text-gray-900">{d.name}</h3>
            <p className="text-sm text-cdl-blue font-medium">{d.role}</p>
            {d.bio && <p className="mt-2 text-sm text-cdl-gray-text">{d.bio}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
