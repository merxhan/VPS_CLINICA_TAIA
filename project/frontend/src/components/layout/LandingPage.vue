<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 pt-16 pb-16 relative">
    <div class="absolute top-4 right-4 z-50">
      <select v-model="locale" class="text-sm border border-gray-300 rounded p-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
        <option value="pt">🇧🇷 PT</option>
        <option value="es">🇪🇸 ES</option>
        <option value="en">🇺🇸 EN</option>
      </select>
    </div>
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-primary">{{ $t('login_title') }}</h2>
        <p class="mt-2 text-sm text-gray-600">{{ $t('login_subtitle') }}</p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="cpf" class="sr-only">CPF</label>
            <input
              id="cpf"
              type="text"
              v-model="form.cpf"
              required
              :disabled="isLoading"
              class="input-field"
              :placeholder="$t('login_cpf')"
              maxlength="11"
            />
          </div>
          <div>
            <label for="dob" class="sr-only">Contraseña / Fecha de Nacimiento</label>
            <input
              id="dob"
              type="password"
              v-model="form.dob"
              required
              :disabled="isLoading"
              class="input-field"
              :placeholder="$t('login_dob') + ' (YYYYMMDD)'"
              maxlength="8"
            />
          </div>
        </div>
        <div>
          <button
            id="login-submit"
            type="submit"
            :disabled="isLoading"
            class="w-full btn btn-primary flex justify-center py-3 text-lg disabled:opacity-50"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span v-if="isLoading">{{ $t('login_button') }}...</span>
            <span v-else>{{ $t('login_button') }}</span>
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from '../../services/api';
import { useAuth, type AuthUser } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const auth = useAuth();
const toast = useToast();
const isLoading = ref(false);
const form = reactive({ cpf: '', dob: '' });

interface LoginResponse {
  message: string;
  user: AuthUser;
  token: string;
}

const handleLogin = async () => {
  if (!form.cpf.trim() || !form.dob) {
    toast.show(t('login_error'), 'error');
    return;
  }

  isLoading.value = true;
  const result = await api.post<LoginResponse>('auth/login', {
    cpf: form.cpf.trim(),
    dob: form.dob,
  });
  isLoading.value = false;

  if (result.ok && result.data) {
    auth.setAuth(result.data.user, result.data.token);
    toast.show(t('login_success'), 'success');

    if (result.data.user.role === 'paciente') {
      window.location.href = `/pacientes/${result.data.user.id}`;
    } else {
      window.location.href = '/dashboard';
    }
  } else {
    toast.show(t('login_error'), 'error');
  }
};
</script>
