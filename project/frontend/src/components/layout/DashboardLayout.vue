<script setup lang="ts">
import { ref } from 'vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';

const sidebarOpen = ref(window.innerWidth >= 768);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header @toggleSidebar="toggleSidebar" />
    
    <div 
      v-if="sidebarOpen" 
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
    ></div>

    <Sidebar :isOpen="sidebarOpen" />
    
    <main :class="['pt-16 pb-16 min-h-screen transition-all duration-300 ease-in-out', sidebarOpen ? 'md:ml-64' : '']">
      <div class="w-[90%] mx-auto mt-6">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>
