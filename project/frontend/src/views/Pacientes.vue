<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-primary">{{ $t('patients_title') }}</h2>
      </div>
      <button @click="openCreateModal" class="btn btn-primary shadow-md hover:shadow-lg transition-all flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        {{ $t('patients_new') }}
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
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('patients_name') }}</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('patients_cpf') }}</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('patients_phone') }}</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="pacientes.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">
              {{ $t('patients_not_found') }}
            </td>
          </tr>
          <tr v-for="paciente in pacientes" :key="paciente.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ paciente.nombre }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ displayCPF(paciente.cpf) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ displayPhone(paciente.telefono) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <router-link :to="`/pacientes/${paciente.id}`" class="text-emerald-600 hover:text-emerald-900 mr-4 font-semibold transition-colors">Ver</router-link>
              <button @click="openEditModal(paciente)" class="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold transition-colors">{{ $t('edit') }}</button>
              <button @click="confirmDelete(paciente)" class="text-red-600 hover:text-red-900 font-semibold transition-colors">{{ $t('delete') }}</button>
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
        <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-gray-100">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                  {{ form.id ? $t('patients_modal_edit') : $t('patients_modal_title') }}
                </h3>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('patients_name') }} *</label>
                    <input v-model="form.nombre" type="text" class="input-field" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('patients_cpf') }} *</label>
                    <input v-model="form.cpf" @input="formatCPF" type="text" class="input-field" placeholder="000.000.000-00" :disabled="!!form.id" maxlength="14" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('patients_dob') }} *</label>
                    <input v-model="form.fecha_nacimiento" type="date" :max="new Date().toISOString().split('T')[0]" class="input-field" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('patients_profession') }}</label>
                    <input v-model="form.profesion" type="text" class="input-field" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('patients_phone') }} *</label>
                    <input v-model="form.telefono" @input="formatPhone" type="text" class="input-field" placeholder="(00) 00000-0000" maxlength="15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="savePaciente" :disabled="isSaving" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors">
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
                    {{ $t('patients_delete_confirm') }} <span class="font-bold text-gray-700">"{{ pacienteToDelete?.nombre }}"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="deletePaciente" :disabled="isDeleting" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors">
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

interface Paciente {
  id: number;
  nombre: string;
  cpf: string;
  profesion: string;
  telefono: string;
  fecha_nacimiento: string;
}

const pacientes = ref<Paciente[]>([]);
const isLoading = ref(true);
const isSaving = ref(false);
const isDeleting = ref(false);

// Modal Data
const isModalOpen = ref(false);
const form = ref({
  id: null as number | null,
  nombre: '',
  cpf: '',
  profesion: '',
  telefono: '',
  fecha_nacimiento: '',
});

const errors = ref({
  nombre: '',
  cpf: '',
  telefono: '',
  fechaNacimiento: ''
});

// Delete Modal Data
const isDeleteModalOpen = ref(false);
const pacienteToDelete = ref<Paciente | null>(null);

const displayCPF = (cpf: string | number) => {
  if (!cpf) return '';
  const value = String(cpf).replace(/\D/g, '');
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return String(cpf);
};

const displayPhone = (phone: string | number) => {
  if (!phone) return '-';
  const value = String(phone).replace(/\D/g, '');
  if (value.length === 11) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (value.length === 10) {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return String(phone);
};

const formatCPF = (event: Event) => {
  let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }
  form.value.cpf = value;
};

const formatPhone = (event: Event) => {
  let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  if (value.length > 10) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
  } else if (value.length > 0) {
    value = value.replace(/(\d{1,2})/, '($1');
  }
  form.value.telefono = value;
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await api.get<Paciente[]>('pacientes');
    if (res.ok && res.data) {
      pacientes.value = res.data;
    } else {
      toast.show(res.error || t('toast_error_load'), 'error');
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
  form.value = { id: null, nombre: '', cpf: '', profesion: '', telefono: '', fecha_nacimiento: '' };
  isModalOpen.value = true;
};

const openEditModal = (paciente: Paciente) => {
  form.value = {
    id: paciente.id,
    nombre: paciente.nombre,
    cpf: paciente.cpf,
    profesion: paciente.profesion || '',
    telefono: paciente.telefono || '',
    fecha_nacimiento: paciente.fecha_nacimiento ? paciente.fecha_nacimiento.toString().split('T')[0] : '',
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const savePaciente = async () => {
  errors.value = { nombre: '', cpf: '', telefono: '', fechaNacimiento: '' };

  if (!form.value.nombre.trim() || !form.value.cpf.trim() || !form.value.telefono.trim() || !form.value.fecha_nacimiento) {
    toast.show(t('toast_error_required'), 'error');
    if (!form.value.nombre.trim()) errors.value.nombre = 'El campo Nombre es obligatorio.';
    if (!form.value.cpf.trim()) errors.value.cpf = 'El campo CPF es obligatorio.';
    if (!form.value.telefono.trim()) errors.value.telefono = 'El campo Teléfono es obligatorio.';
    if (!form.value.fecha_nacimiento) errors.value.fechaNacimiento = 'El campo Fecha de Nacimiento es obligatorio.';
    return;
  }

  const cpfClean = form.value.cpf.replace(/\D/g, '');
  if (cpfClean.length !== 11) {
    errors.value.cpf = 'El CPF debe tener 11 dígitos.';
    toast.show(t('toast_error_cpf_format'), 'error');
    return;
  }

  const dob = new Date(form.value.fecha_nacimiento);
  const today = new Date();
  if (dob > today) {
    errors.value.fechaNacimiento = 'La fecha no puede ser en el futuro.';
    toast.show(t('toast_error_dob_future'), 'error');
    return;
  }

  const phoneClean = form.value.telefono.replace(/\D/g, '');
  if (phoneClean.length < 10) {
    errors.value.telefono = 'Teléfono inválido.';
    toast.show(t('toast_error_phone_format'), 'error');
    return;
  }

  isSaving.value = true;
  const payload = {
    nombre: form.value.nombre.trim(),
    cpf: form.value.cpf.trim().replace(/\D/g, ''),
    profesion: form.value.profesion.trim(),
    telefono: form.value.telefono.trim(),
    fecha_nacimiento: form.value.fecha_nacimiento,
  };

  try {
    if (form.value.id) {
      const res = await api.put<Paciente>(`pacientes/${form.value.id}`, payload);
      if (res.ok) {
        toast.show(t('toast_success_updated'), 'success');
        await fetchData();
        closeModal();
      } else {
        toast.show(res.error || t('toast_error_update'), 'error');
      }
    } else {
      const res = await api.post<Paciente>('pacientes', payload);
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

const confirmDelete = (paciente: Paciente) => {
  pacienteToDelete.value = paciente;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  pacienteToDelete.value = null;
};

const deletePaciente = async () => {
  if (!pacienteToDelete.value) return;
  
  isDeleting.value = true;
  try {
    const res = await api.delete(`pacientes/${pacienteToDelete.value.id}`);
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
