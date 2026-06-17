<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../services/api';

const currentDate = ref('');
const greeting = ref('');

const summary = ref({
  totalPacientes: 0,
  totalServicios: 0,
  sesionesPendientes: 0,
  receitaMensal: 0,
});

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const fetchSummary = async () => {
  try {
    const res = await api.get<{
      totalPacientes: number;
      totalServicios: number;
      sesionesPendientes: number;
      receitaMensal: number;
    }>('dashboard/summary');
    
    if (res.ok && res.data) {
      summary.value = res.data;
    }
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
  }
};

onMounted(() => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hour = now.getHours();
  if (hour < 12) greeting.value = 'greeting_morning';
  else if (hour < 18) greeting.value = 'greeting_afternoon';
  else greeting.value = 'greeting_evening';

  fetchSummary();
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl p-8 text-white shadow-lg">
      <h1 class="text-3xl font-bold mb-1">{{ $t(greeting) }}, {{ $t('role_admin') }}</h1>
      <p class="text-blue-200 text-sm capitalize">{{ currentDate }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Ativo</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900">{{ summary.totalPacientes }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ $t('dash_active_patients') }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Catálogo</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900">{{ summary.totalServicios }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ $t('dash_total_services') }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pendente</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900">{{ summary.sesionesPendientes }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ $t('dash_pending_sessions') }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">R$</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900">{{ formatCurrency(summary.receitaMensal) }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ $t('dash_monthly_income') }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div class="space-y-3">
          <router-link to="/pacientes" class="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors group">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ $t('patients_title') }}</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>

          <router-link to="/servicios" class="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors group">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ $t('services_title') }}</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('dash_recent_activity') }}</h2>
        <div class="flex flex-col items-center justify-center py-8 text-gray-400">
          <svg class="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p class="text-sm">{{ $t('dash_no_activity') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
