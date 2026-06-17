<template>
  <aside 
    :class="isOpen ? 'translate-x-0' : 'translate-x-full md:-translate-x-full'" 
    class="fixed inset-y-0 right-0 md:right-auto md:left-0 w-64 bg-secondary text-white transition-transform duration-300 ease-in-out z-30 pt-16"
  >
    <nav class="mt-8 px-4 space-y-2">
      <router-link to="/dashboard" class="block py-2 px-4 rounded hover:bg-primary transition-colors">{{ $t('nav_dashboard') }}</router-link>
      <router-link to="/pacientes" class="block py-2 px-4 rounded hover:bg-primary transition-colors">{{ $t('nav_patients') }}</router-link>
      <router-link to="/servicios" class="block py-2 px-4 rounded hover:bg-primary transition-colors">{{ $t('nav_services') }}</router-link>
      <router-link to="/categorias" class="block py-2 px-4 rounded hover:bg-primary transition-colors">{{ $t('nav_categories') }}</router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
</script>
