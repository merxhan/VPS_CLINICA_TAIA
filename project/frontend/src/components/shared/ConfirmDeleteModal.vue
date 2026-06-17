<template>
  <BaseModal :isOpen="isOpen" title="Confirmar Eliminación" @close="$emit('close')">
    <p class="text-sm text-gray-500">¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.</p>
    <template #footer>
      <button type="button" class="btn btn-danger w-full sm:ml-3 sm:w-auto" @click="$emit('confirm')">Eliminar</button>
      <button type="button" class="mt-3 w-full btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto" @click="$emit('close')">Cancelar</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue';
defineProps<{ isOpen: boolean }>();
defineEmits(['close', 'confirm']);
</script>
