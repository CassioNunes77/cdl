'use client';

import { useState } from 'react';
import { apiPost } from '@/lib/api';

export default function AtendimentoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiPost('/contact', form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao enviar.';
      const isNetwork = /fetch|network|Failed/i.test(msg);
      setError(isNetwork ? 'Serviço em configuração. Tente novamente mais tarde ou entre em contato por email.' : msg);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="py-12 sm:py-16">
        <div className="container-cdl max-w-xl text-center">
          <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Mensagem enviada</h1>
          <p className="mt-2 text-cdl-gray-text">
            Entraremos em contato em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container-cdl max-w-xl">
        <h1 className="text-3xl font-bold text-gray-900">Atendimento</h1>
        <p className="mt-4 text-cdl-gray-text">
          Fale com a CDL Paulo Afonso. Preencha o formulário abaixo.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome *</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Assunto</label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem *</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
            {loading ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      </div>
    </div>
  );
}
