'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPut, type SiteSettings } from '@/lib/api';

const SETTING_KEYS = [
  { key: 'hero_title', label: 'Título do hero (Home)', placeholder: 'A CDL que faz sua empresa...' },
  { key: 'hero_subtitle', label: 'Subtítulo do hero', placeholder: 'Comunidade empresarial...' },
  { key: 'phone', label: 'Telefone' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Endereço' },
];

export default function AdminConfiguracoesPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    apiGet<SiteSettings>('/settings', token)
      .then(setSettings)
      .catch(() => setSettings({}))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    try {
      const updated = await apiPut<SiteSettings>('/settings', settings, token);
      setSettings(updated);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-cdl-gray-text">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Configurações do site</h1>
      <p className="mt-1 text-cdl-gray-text">Textos e dados exibidos no site</p>
      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
        {SETTING_KEYS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={key}
              type="text"
              value={settings[key] ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
              placeholder={placeholder}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>
        ))}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
