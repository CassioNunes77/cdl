'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const user = (email || '').trim().toLowerCase();
    const pass = password || '';
    if ((user === ADMIN_USER || user === 'admin@cdlpauloafonso.com.br') && pass === ADMIN_PASS) {
      localStorage.setItem('cdl_admin_token', 'mock-admin-token');
      router.push('/admin');
    } else {
      setError('Usuário ou senha incorretos');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cdl-gray p-4">
      <div className="w-full max-w-sm rounded-xl bg-white border border-gray-200 shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="CDL Paulo Afonso" width={120} height={44} className="h-10 w-auto" />
        </div>
        <h1 className="text-xl font-bold text-center text-gray-900">Área administrativa</h1>
        <p className="mt-1 text-sm text-center text-cdl-gray-text">Faça login para continuar</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-cdl-blue focus:ring-1 focus:ring-cdl-blue"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
