<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-primary">{{ $t('services_title') }}</h2>
      </div>
      <button @click="openCreateModal" class="btn btn-primary shadow-md hover:shadow-lg transition-all flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        {{ $t('services_new') }}
      </button>
    </div>
    
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div v-if="isLoading" class="p-8 flex justify-center">
        <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-else class="overflow-x-auto w-full">
        <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('services_name') }}</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('diag_desc_label') }}</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('nav_categories') }}</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="servicios.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">
              {{ $t('services_not_found') }}
            </td>
          </tr>
          <tr v-for="servicio in servicios" :key="servicio.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ servicio.nombre }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ servicio.descripcion || '-' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {{ servicio.categoria?.nombre || '-' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openEditModal(servicio)" class="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold transition-colors">{{ $t('edit') }}</button>
              <button @click="confirmDelete(servicio)" class="text-red-600 hover:text-red-900 font-semibold transition-colors">{{ $t('delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    <!-- Modal de Formulario -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-100">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                  {{ form.id ? $t('services_modal_edit') : $t('services_modal_title') }}
                </h3>
                <div class="mt-6 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('services_name') }} *</label>
                    <input v-model="form.nombre" type="text" class="input-field" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('diag_desc_label') }}</label>
                    <textarea v-model="form.descripcion" rows="3" class="input-field"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('nav_categories') }} *</label>
                    <select v-model="form.categoriaId" class="input-field">
                      <option :value="null" disabled>Seleccione una categoría</option>
                      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                        {{ cat.nombre }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="saveServicio" :disabled="isSaving" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors">
              {{ isSaving ? $t('diag_saving') : $t('save') }}
            </button>
            <button type="button" @click="closeModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
              {{ $t('cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación Eliminar -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeDeleteModal" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-gray-100">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-bold text-gray-900" id="modal-title">{{ $t('delete') }}</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ $t('patients_delete_confirm') }} <span class="font-bold text-gray-700">"{{ servicioToDelete?.nombre }}"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="deleteServicio" :disabled="isDeleting" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors">
              {{ isDeleting ? $t('diag_saving') : $t('delete') }}
            </button>
            <button type="button" @click="closeDeleteModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
              {{ $t('cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../services/api';
import { useToast } from '../composables/useToast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
}

const servicios = ref<Servicio[]>([]);
const categorias = ref<Categoria[]>([]);
const isLoading = ref(true);
const isSaving = ref(false);
const isDeleting = ref(false);

// Modal Data
const isModalOpen = ref(false);
const form = ref({
  id: null as number | null,
  nombre: '',
  descripcion: '',
  categoriaId: null as number | null,
});

// Delete Modal Data
const isDeleteModalOpen = ref(false);
const servicioToDelete = ref<Servicio | null>(null);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resServicios, resCategorias] = await Promise.all([
      api.get<Servicio[]>('servicios'),
      api.get<Categoria[]>('categorias')
    ]);
    
    if (resServicios.ok && resServicios.data) {
      servicios.value = resServicios.data;
    } else {
      toast.show(t('toast_error_load'), 'error');
    }

    if (resCategorias.ok && resCategorias.data) {
      categorias.value = resCategorias.data;
    } else {
      toast.show(t('toast_error_load'), 'error');
    }
  } catch (error) {
    toast.show(t('toast_error_network'), 'error');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const openCreateModal = () => {
  form.value = { id: null, nombre: '', descripcion: '', categoriaId: null };
  isModalOpen.value = true;
};

const openEditModal = (servicio: Servicio) => {
  form.value = {
    id: servicio.id,
    nombre: servicio.nombre,
    descripcion: servicio.descripcion || '',
    categoriaId: servicio.categoria?.id || null,
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveServicio = async () => {
  if (!form.value.nombre.trim() || !form.value.categoriaId) {
    toast.show(t('toast_error_required'), 'error');
    return;
  }

  isSaving.value = true;
  const payload = {
    nombre: form.value.nombre,
    descripcion: form.value.descripcion,
    categoria: { id: form.value.categoriaId }
  };

  try {
    if (form.value.id) {
      const res = await api.put<Servicio>(`servicios/${form.value.id}`, payload);
      if (res.ok) {
        toast.show(t('toast_success_updated'), 'success');
        await fetchData();
        closeModal();
      } else {
        toast.show(res.error || t('toast_error_update'), 'error');
      }
    } else {
      const res = await api.post<Servicio>('servicios', payload);
      if (res.ok) {
        toast.show(t('toast_success_created'), 'success');
        await fetchData();
        closeModal();
      } else {
        toast.show(res.error || t('toast_error_create'), 'error');
      }
    }
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (servicio: Servicio) => {
  servicioToDelete.value = servicio;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  servicioToDelete.value = null;
};

const deleteServicio = async () => {
  if (!servicioToDelete.value) return;
  
  isDeleting.value = true;
  try {
    const res = await api.delete(`servicios/${servicioToDelete.value.id}`);
    if (res.ok) {
      toast.show(t('toast_success_deleted'), 'success');
      await fetchData();
      closeDeleteModal();
    } else {
      toast.show(res.error || t('toast_error_delete'), 'error');
    }
  } finally {
    isDeleting.value = false;
  }
};
</script>
