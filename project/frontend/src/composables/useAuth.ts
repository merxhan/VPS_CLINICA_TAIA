import { reactive, readonly } from 'vue';

export interface AuthUser {
  id: number;
  role: 'admin' | 'paciente';
  nombre: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const SESSION_KEY = 'taia_auth';

function loadFromStorage(): AuthState {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        user: parsed.user ?? null,
        token: parsed.token ?? null,
        isAuthenticated: !!parsed.token,
      };
    }
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
  }
  return { user: null, token: null, isAuthenticated: false };
}

const state = reactive<AuthState>(loadFromStorage());

function persistToStorage(): void {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ user: state.user, token: state.token }),
  );
}

function setAuth(user: AuthUser, token: string): void {
  state.user = user;
  state.token = token;
  state.isAuthenticated = true;
  persistToStorage();
}

function clearAuth(): void {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
  sessionStorage.removeItem(SESSION_KEY);
}

export function useAuth() {
  return {
    state: readonly(state),
    setAuth,
    clearAuth,
  };
}
