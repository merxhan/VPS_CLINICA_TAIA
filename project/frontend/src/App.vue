<template>
  <router-view />
  <ToastNotification
    :isVisible="toast.state.isVisible"
    :message="toast.state.message"
    :type="toast.state.type"
  />
</template>

<script setup lang="ts">
import { useToast } from './composables/useToast';
import ToastNotification from './components/shared/ToastNotification.vue';

const toast = useToast();
</script>
