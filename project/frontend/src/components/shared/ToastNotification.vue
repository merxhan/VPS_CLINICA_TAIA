<template>
  <transition name="toast-fade">
    <div v-if="isVisible" :class="[
      'fixed top-20 right-6 px-4 py-3 rounded shadow-lg z-[100] flex items-center transition-all duration-300',
      type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'
    ]">
      <span class="font-medium">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ isVisible: boolean; message: string; type: 'success' | 'error' }>();
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
