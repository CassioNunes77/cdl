'use client';

import { useEffect, useState } from 'react';
import {
  getBeneficiosAssociados,
  setBeneficiosAssociados,
  type BeneficiosAssociadosItem,
} from '@/lib/firestore';
import { initFirebase } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

export default function AdminBeneficiosAssociadosPage() {
  const [data, setData] = useState<BeneficiosAssociadosItem>({
    title: '',
    description: '',
    photo: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getBeneficiosAssociados()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function uploadImageFile(file?: File | null) {
    if (!file) return;
    setImageError('');
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', IMGBB_KEY || '');

      const res = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Falha no upload da imagem');

      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Erro no upload');

      setData((prev) => ({ ...prev, photo: json.data.url }));
    } catch (e: any) {
      setImageError(e.message || 'Erro ao fazer upload');
    } finally {
      setImageUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await setBeneficiosAssociados(data);
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Benefícios para Associados</h1>
        <p className="mt-1 text-cdl-gray-text">
          Edite as informações da página de benefícios para associados do site
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Foto Principal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Principal
          </label>
          {data.photo ? (
            <div className="relative">
              <img
                src={data.photo}
                alt="Foto principal"
                className="h-48 w-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => setData((prev) => ({ ...prev, photo: null }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImageFile(e.target.files?.[0])}
                disabled={imageUploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cdl-blue file:text-white hover:file:bg-cdl-blue-dark"
              />
              {imageUploading && <p className="mt-2 text-sm text-gray-500">Enviando...</p>}
              {imageError && <p className="mt-2 text-sm text-red-600">{imageError}</p>}
            </div>
          )}
        </div>

        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cdl-blue focus:border-transparent"
            placeholder="Ex: Benefícios Exclusivos para Associados"
          />
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cdl-blue focus:border-transparent"
            placeholder="Descreva os benefícios oferecidos aos associados..."
          />
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <a
            href="/beneficios-associados"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Ver no site
          </a>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-cdl-blue text-white rounded-md hover:bg-cdl-blue-dark disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
