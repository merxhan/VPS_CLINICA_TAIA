<template>
  <header class="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 z-40">
    <div class="flex items-center space-x-4">
      <div class="text-xl font-bold text-primary">TAIA</div>
      <button v-if="!isPaciente" @click="$emit('toggleSidebar')" class="hidden md:block text-gray-600 hover:text-primary focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
    
    <div class="flex items-center space-x-4">
      <select v-model="locale" class="text-sm border border-gray-300 rounded p-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
        <option value="pt">🇧🇷 PT</option>
        <option value="es">🇪🇸 ES</option>
        <option value="en">🇺🇸 EN</option>
      </select>
      <button @click="handleLogout" class="text-sm font-medium text-gray-700 hover:text-danger transition-colors">
        {{ $t('nav_logout') }}
      </button>
      <button v-if="!isPaciente" @click="$emit('toggleSidebar')" class="md:hidden text-gray-600 hover:text-primary focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { locale } = useI18n();
defineEmits(['toggleSidebar']);

const router = useRouter();
const auth = useAuth();
const isPaciente = computed(() => auth.state.user?.role === 'paciente');

const handleLogout = () => {
  auth.clearAuth();
  router.push({ name: 'login' });
};
</script>
