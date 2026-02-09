const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const API_URL = `${BASE.replace(/\/$/, '')}/api`;

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('cdl_admin_token');
}

/** Em produção sem API configurada, não tenta fetch (evita NetworkError) */
function isApiAvailable(): boolean {
  if (typeof window === 'undefined') return !!process.env.NEXT_PUBLIC_API_URL;
  if (process.env.NEXT_PUBLIC_API_URL) return true;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

export async function api<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<T> {
  if (!isApiAvailable()) {
    return Promise.reject(new Error('API não configurada'));
  }
  const { token = getToken(), ...init } = options;
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const apiGet = <T>(path: string, token?: string | null) =>
  api<T>(path, { method: 'GET', token });
export const apiPost = <T>(path: string, body: unknown, token?: string | null) =>
  api<T>(path, { method: 'POST', body: JSON.stringify(body), token });
export const apiPut = <T>(path: string, body: unknown, token?: string | null) =>
  api<T>(path, { method: 'PUT', body: JSON.stringify(body), token });
export const apiPatch = <T>(path: string, body?: unknown, token?: string | null) =>
  api<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined, token });
export const apiDelete = <T>(path: string, token?: string | null) =>
  api<T>(path, { method: 'DELETE', token });

export type Page = { id: string; slug: string; title: string; content: string; excerpt: string | null; published: boolean };
export type Director = { id: string; name: string; role: string; photo: string | null; order: number; bio: string | null };
export type Service = { id: string; title: string; slug: string; description: string; icon: string | null; order: number; published: boolean };
export type NewsItem = { id: string; title: string; slug: string; excerpt: string; content: string; image: string | null; published: boolean; publishedAt: string | null; createdAt: string };
export type SiteSettings = Record<string, string>;
export type About = { id?: string; title: string; description: string; photo: string | null };
