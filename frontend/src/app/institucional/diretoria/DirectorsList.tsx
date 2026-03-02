import Image from 'next/image';

const getApiBase = () => process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type Director = {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  bio: string | null;
  order: number;
};

async function getDirectors(): Promise<Director[]> {
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

// Função para categorizar diretores por cargo
function categorizeDirectors(directors: Director[]) {
  const president = directors.find((d) =>
    d.role.toLowerCase().includes('presidente')
  );
  const vicePresidents = directors.filter((d) =>
    d.role.toLowerCase().includes('vice') || d.role.toLowerCase().includes('vice-presidente')
  );
  const others = directors.filter(
    (d) =>
      !d.role.toLowerCase().includes('presidente') &&
      !d.role.toLowerCase().includes('vice') &&
      !d.role.toLowerCase().includes('vice-presidente')
  );

  return { president, vicePresidents, others };
}

export async function DirectorsList() {
  const directors = await getDirectors();

  if (directors.length === 0) {
    return (
      <section className="mt-16">
        <div className="text-center py-12 px-6 rounded-xl border-2 border-dashed border-gray-300 bg-white">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Nossa Diretoria</h2>
          <p className="text-cdl-gray-text">Informações da diretoria em breve.</p>
        </div>
      </section>
    );
  }

  const { president, vicePresidents, others } = categorizeDirectors(directors);

  return (
    <section className="mt-16">
      {/* Presidente */}
      {president && (
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Presidência
          </h2>
          <div className="max-w-md mx-auto">
            <DirectorCard director={president} featured />
          </div>
        </div>
      )}

      {/* Vice-Presidentes */}
      {vicePresidents.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Vice-Presidência
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {vicePresidents.map((d) => (
              <DirectorCard key={d.id} director={d} />
            ))}
          </div>
        </div>
      )}

      {/* Diretores */}
      {others.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Diretoria
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {others.map((d) => (
              <DirectorCard key={d.id} director={d} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function DirectorCard({
  director,
  featured = false,
}: {
  director: Director;
  featured?: boolean;
}) {
  const photoSize = featured ? 'w-48 h-48' : 'w-40 h-40';
  const textSize = featured ? 'text-xl' : 'text-lg';

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:shadow-lg hover:border-cdl-blue/30 ${
        featured ? 'shadow-md' : ''
      }`}
    >
      {director.photo ? (
        <div
          className={`relative ${photoSize} mx-auto rounded-full overflow-hidden bg-cdl-gray mb-4 ring-4 ring-cdl-blue/10`}
        >
          <Image
            src={director.photo.startsWith('http') ? director.photo : `${getApiBase()}${director.photo}`}
            alt={director.name}
            fill
            className="object-cover"
            sizes={featured ? '192px' : '160px'}
          />
        </div>
      ) : (
        <div
          className={`${photoSize} mx-auto rounded-full bg-gradient-to-br from-cdl-blue/20 to-cdl-blue-dark/20 flex items-center justify-center mb-4 ring-4 ring-cdl-blue/10`}
        >
          <span className={`${textSize} font-bold text-cdl-blue`}>
            {director.name.charAt(0)}
          </span>
        </div>
      )}
      <h3 className={`${textSize} font-bold text-gray-900 mb-2`}>
        {director.name}
      </h3>
      <p className="text-sm font-semibold text-cdl-blue mb-3">{director.role}</p>
      {director.bio && (
        <p className="text-sm text-cdl-gray-text leading-relaxed">{director.bio}</p>
      )}
    </div>
  );
}
