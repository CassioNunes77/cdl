'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAbout, type AboutItem } from '@/lib/firestore';

export default function CDLPauloAfonsoPage() {
  const [about, setAbout] = useState<AboutItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAbout()
      .then(setAbout)
      .catch(() => setAbout({ title: '', description: '', photo: null }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container-cdl py-12 text-center text-cdl-gray-text">
        Carregando...
      </div>
    );
  }

  const title = about?.title || 'CDL Paulo Afonso';
  const description = about?.description || '';
  const photo = about?.photo;

  return (
    <div className="container-cdl py-8 sm:py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h1>

        {photo && (
          <div className="mb-8">
            <Image
              src={photo}
              alt={title}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              unoptimized={photo.startsWith('http')}
            />
          </div>
        )}

        <div className="prose-cdl max-w-none">
          {description ? (
            <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />
          ) : (
            <p className="text-cdl-gray-text">Conteúdo em edição.</p>
          )}
        </div>
      </div>
    </div>
  );
}
