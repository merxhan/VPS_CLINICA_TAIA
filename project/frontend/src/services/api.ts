const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
import { i18n } from '../i18n';

interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  status: number;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = sessionStorage.getItem('taia_auth');
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed.token) headers['Authorization'] = `Bearer ${parsed.token}`;
      } catch { /* ignore */ }
    }

    const res = await fetch(`${API_BASE}/${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({ message: res.statusText }));
      const t = i18n.global.t as any;
      return {
        ok: false,
        error: errorBody.message ?? t('toast_error_server'),
        status: res.status,
      };
    }

    let data;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : undefined;
    } catch {
      data = undefined;
    }
    return { ok: true, data, status: res.status };
  } catch (err) {
    const t = i18n.global.t as any;
    return {
      ok: false,
      error: err instanceof Error ? err.message : t('toast_error_network'),
      status: 0,
    };
  }
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
