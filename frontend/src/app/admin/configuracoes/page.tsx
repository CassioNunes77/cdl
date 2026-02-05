'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPut, type SiteSettings } from '@/lib/api';

const WHATSAPP_STORAGE_KEY = 'cdl_whatsapp_number';

const SETTING_KEYS = [
  { key: 'hero_title', label: 'Título do hero (Home)', placeholder: 'A CDL que faz sua empresa...' },
  { key: 'hero_subtitle', label: 'Subtítulo do hero', placeholder: 'Comunidade empresarial...' },
  { key: 'phone', label: 'Telefone', placeholder: '' },
  { key: 'email', label: 'Email', placeholder: '' },
  { key: 'address', label: 'Endereço', placeholder: '' },
  { key: 'whatsapp_number', label: 'WhatsApp (número com DDD, ex: 75999999999)', placeholder: '75999999999' },
];

export default function AdminConfiguracoesPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('cdl_admin_token');
    if (!token) return;
    apiGet<SiteSettings>('/settings', token)
      .then((data) => {
        const stored = localStorage.getItem(WHATSAPP_STORAGE_KEY);
        if (stored && !data.whatsapp_number) {
          setSettings({ ...data, whatsapp_number: stored });
        } else {
          setSettings(data);
        }
      })
      .catch(() => {
        const stored = localStorage.getItem(WHATSAPP_STORAGE_KEY);
        setSettings(stored ? { whatsapp_number: stored } : {});
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('cdl_admin_token');
    const whatsapp = settings.whatsapp_number?.trim();
    if (whatsapp) {
      localStorage.setItem(WHATSAPP_STORAGE_KEY, whatsapp);
    } else {
      localStorage.removeItem(WHATSAPP_STORAGE_KEY);
    }
    try {
      const updated = await apiPut<SiteSettings>('/settings', settings, token);
      setSettings(updated);
    } catch {
      setSettings((s) => ({ ...s, whatsapp_number: whatsapp || '' }));
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
