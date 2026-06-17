<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';
import { useAuth } from '../../composables/useAuth';

const auth = useAuth();
const isPaciente = computed(() => auth.state.user?.role === 'paciente');
const sidebarOpen = ref(window.innerWidth >= 768 && !isPaciente.value);

const toggleSidebar = () => {
  if (isPaciente.value) return;
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header @toggleSidebar="toggleSidebar" />
    
    <div 
      v-if="sidebarOpen && !isPaciente" 
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
    ></div>

    <Sidebar v-if="!isPaciente" :isOpen="sidebarOpen" />
    
    <main :class="['pt-16 pb-16 min-h-screen transition-all duration-300 ease-in-out', sidebarOpen && !isPaciente ? 'md:ml-64' : '']">
      <div class="w-[90%] mx-auto mt-6">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>
