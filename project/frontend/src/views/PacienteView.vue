<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-primary flex items-center gap-2">
            <router-link v-if="!isPacienteRole" to="/pacientes" class="text-gray-400 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </router-link>
            {{ $t('ficha_title') }}
          </h2>
        </div>
        <button v-if="!isPacienteRole" @click="openDiagnosticoModal" class="btn btn-primary shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          {{ $t('ficha_new_diag') }}
        </button>
      </div>

      <div v-if="isLoading" class="flex justify-center p-12">
        <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else-if="paciente" class="space-y-6">
        <!-- Personal Info Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start">
          <div class="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold uppercase shrink-0">
            {{ paciente.nombre.charAt(0) }}
          </div>
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p class="text-sm text-gray-500 font-medium">{{ $t('patients_name') }}</p>
              <p class="text-lg font-semibold text-gray-900">{{ paciente.nombre }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">{{ $t('patients_cpf') }}</p>
              <p class="text-lg font-semibold text-gray-900">{{ displayCPF(paciente.cpf) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">{{ $t('patients_phone') }}</p>
              <p class="text-md text-gray-800">{{ displayPhone(paciente.telefono) || '-' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">{{ $t('patients_profession') }}</p>
              <p class="text-md text-gray-800">{{ paciente.profesion || '-' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">{{ $t('patients_dob') }}</p>
              <p class="text-md text-gray-800">{{ formatDate(paciente.fecha_nacimiento) }}</p>
            </div>
          </div>
        </div>

        <!-- Diagnósticos y Sesiones -->
        <h3 class="text-xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">{{ $t('ficha_diag_history') }}</h3>
        
        <div v-if="!paciente.diagnosticos || paciente.diagnosticos.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          {{ $t('ficha_no_diag') }}
        </div>
        
        <div v-else class="space-y-6">
          <div v-for="diag in paciente.diagnosticos" :key="diag.id" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-2">
                  {{ $t('ficha_diag_service') }}: {{ diag.servicio?.nombre || '-' }}
                </span>
                <h4 class="text-lg font-bold text-gray-900">Diagnóstico #{{ diag.id }}</h4>
              </div>
              <div class="text-sm text-gray-500 font-medium flex items-center gap-4">
                <span>{{ $t('ficha_diag_date') }}: {{ formatDate(diag.fecha_diagnostico) }}</span>
                <div class="flex gap-2">
                  <button v-if="!isPacienteRole" @click="editDiagnostico(diag)" class="text-blue-600 hover:text-blue-800" title="Editar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  <button v-if="!isPacienteRole && canDeleteDiagnostico(diag)" @click="confirmDeleteModal(diag.id)" class="text-red-600 hover:text-red-800" title="Eliminar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="mb-6">
                <h5 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">{{ $t('ficha_diag_desc') }}</h5>
                <p class="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">{{ diag.descripcion || $t('ficha_diag_no_desc') }}</p>
              </div>
              
              <div>
                <h5 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">{{ $t('ficha_sessions') }}</h5>
                <div v-if="!diag.sesiones || diag.sesiones.length === 0" class="text-sm text-gray-500 italic">
                  {{ $t('ficha_sessions_none') }}
                </div>
                <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
                <div class="overflow-x-auto w-full">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('ficha_sess_num') }}</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('ficha_sess_date') }}</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('ficha_sess_value') }}</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('ficha_sess_payment') }}</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('ficha_sess_state') }}</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                      <tr v-for="sesion in diag.sesiones" :key="sesion.id" class="hover:bg-gray-50">
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{ sesion.numero_sesiones }}</td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{ formatDateTime(sesion.fecha_sesion) }}</td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatCurrency(sesion.valor) }}</td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ sesion.medio_pago }}</td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <span :class="{
                            'bg-amber-100 text-amber-800': sesion.estado === 'Pendiente',
                            'bg-blue-100 text-blue-800': sesion.estado === 'Paga',
                            'bg-green-100 text-green-800': sesion.estado === 'Realizada'
                          }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                            {{ sesion.estado }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <p class="text-lg text-red-600">No se pudo cargar la información del paciente.</p>
      </div>
    </div>

    <!-- Modal de Nuevo Diagnóstico -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-100">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-xl leading-6 font-bold text-gray-900 border-b pb-3 mb-4">
              {{ editingId ? $t('diag_modal_edit') : $t('diag_modal_title') }}
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('ficha_diag_service') }} *</label>
                <select v-model="form.id_servicio" class="input-field">
                  <option value="" disabled>{{ $t('diag_select_service') }}</option>
                  <option v-for="serv in servicios" :key="serv.id" :value="serv.id">{{ serv.nombre }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('diag_date_label') }}</label>
                <input v-model="form.fecha_diagnostico" type="date" class="input-field" :min="minDateStr" :max="maxDateStr" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('diag_desc_label') }}</label>
                <textarea v-model="form.descripcion" rows="3" class="input-field"></textarea>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-semibold text-gray-800">{{ $t('diag_plan_title') }}</h4>
                <button @click="addSesion" type="button" class="text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded font-medium hover:bg-indigo-100 transition-colors">
                  {{ $t('diag_add_session') }}
                </button>
              </div>
              
              <div v-if="form.sesiones.length === 0" class="text-sm text-gray-500 italic p-4 bg-gray-50 rounded text-center">
                {{ $t('diag_empty_sessions') }}
              </div>
              
              <div v-else class="space-y-3 max-h-60 overflow-y-auto pr-2">
                <div v-for="(sesion, index) in form.sesiones" :key="index" class="flex flex-wrap gap-3 items-end bg-gray-50 p-3 rounded border border-gray-200">
                  <div class="w-16">
                    <label class="block text-xs font-medium text-gray-500 mb-1">{{ $t('ficha_sess_num') }}</label>
                    <input v-model.number="sesion.numero_sesiones" type="number" class="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <div class="flex-1 min-w-[150px]">
                    <label class="block text-xs font-medium text-gray-500 mb-1">{{ $t('ficha_sess_date') }}</label>
                    <input v-model="sesion.fecha_sesion" type="datetime-local" class="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <div class="w-32">
                    <label class="block text-xs font-medium text-gray-500 mb-1">{{ $t('ficha_sess_value') }}</label>
                    <input v-model.number="sesion.valor" type="number" step="0.01" class="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <div class="w-40">
                    <label class="block text-xs font-medium text-gray-500 mb-1">{{ $t('ficha_sess_payment') }}</label>
                    <select v-model="sesion.medio_pago" class="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                      <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                      <option value="Transferencia">Transferencia</option>
                    </select>
                  </div>
                  <div class="w-32">
                    <label class="block text-xs font-medium text-gray-500 mb-1">{{ $t('ficha_sess_state') }}</label>
                    <select v-model="sesion.estado" class="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                      <option value="Pendiente">Pendiente</option>
                      <option value="Paga">Paga</option>
                      <option value="Realizada">Realizada</option>
                    </select>
                  </div>
                  <button @click="removeSesion(index)" type="button" class="text-red-500 hover:text-red-700 p-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="saveDiagnostico" :disabled="isSaving" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors">
              {{ isSaving ? $t('diag_saving') : $t('diag_save') }}
            </button>
            <button type="button" @click="closeModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
              {{ $t('cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Confirmación Eliminar Diagnóstico -->
    <div v-if="diagnosticoToDelete" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="cancelDelete" aria-hidden="true"></div>
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
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ $t('diag_delete_title') }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ $t('diag_delete_desc') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="deleteDiagnostico" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
              {{ $t('delete') }}
            </button>
            <button type="button" @click="cancelDelete" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              {{ $t('cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../services/api';
import { useToast } from '../composables/useToast';
import { useAuth } from '../composables/useAuth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const auth = useAuth();
const pacienteId = route.params.id;

const isPacienteRole = computed(() => auth.state.user?.role === 'paciente');

const canDeleteDiagnostico = (diag: any) => {
  if (!diag.sesiones || diag.sesiones.length === 0) return true;
  return !diag.sesiones.some((s: any) => s.estado === 'Realizada' || s.estado === 'Paga');
};

const isLoading = ref(true);
const isSaving = ref(false);
const paciente = ref<any>(null);
const servicios = ref<any[]>([]);

const maxDateStr = ref(new Date().toISOString().split('T')[0]);
const minDateObj = new Date();
minDateObj.setDate(minDateObj.getDate() - 5);
const minDateStr = ref(minDateObj.toISOString().split('T')[0]);

// Modal Form State
const isModalOpen = ref(false);
const editingId = ref<number | null>(null);
const form = ref({
  id_servicio: '',
  fecha_diagnostico: new Date().toISOString().split('T')[0],
  descripcion: '',
  sesiones: [] as Array<{
    id?: number;
    numero_sesiones: number;
    fecha_sesion: string;
    valor: number;
    medio_pago: string;
    estado: string;
  }>
});

const fetchPaciente = async () => {
  isLoading.value = true;
  try {
    const res = await api.get(`pacientes/${pacienteId}`);
    if (res.ok && res.data) {
      paciente.value = res.data;
      // Sort diagnosticos por id desc for better UX
      if (paciente.value.diagnosticos) {
        paciente.value.diagnosticos.sort((a: any, b: any) => b.id - a.id);
        paciente.value.diagnosticos.forEach((d: any) => {
          if(d.sesiones) {
             d.sesiones.sort((sa: any, sb: any) => sa.numero_sesiones - sb.numero_sesiones);
          }
        });
      }
    } else {
      console.error('Error fetching paciente', res.error);
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const fetchServicios = async () => {
  try {
    const res = await api.get<any[]>('servicios');
    if (res.ok && res.data) {
      servicios.value = res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  if (pacienteId) {
    fetchPaciente();
    fetchServicios();
  }
});

const openDiagnosticoModal = () => {
  editingId.value = null;
  form.value = {
    id_servicio: '',
    fecha_diagnostico: new Date().toISOString().split('T')[0],
    descripcion: '',
    sesiones: []
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingId.value = null;
};

const addSesion = () => {
  form.value.sesiones.push({
    numero_sesiones: form.value.sesiones.length + 1,
    fecha_sesion: new Date().toISOString().slice(0, 16),
    valor: 100,
    medio_pago: 'Efectivo',
    estado: 'Pendiente'
  });
};

const removeSesion = (index: number) => {
  form.value.sesiones.splice(index, 1);
};

const editDiagnostico = (diag: any) => {
  editingId.value = diag.id;
  form.value = {
    id_servicio: diag.servicio?.id || '',
    fecha_diagnostico: diag.fecha_diagnostico,
    descripcion: diag.descripcion || '',
    sesiones: diag.sesiones ? JSON.parse(JSON.stringify(diag.sesiones)).map((s: any) => ({
      ...s,
      fecha_sesion: s.fecha_sesion ? new Date(s.fecha_sesion).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
    })) : []
  };
  isModalOpen.value = true;
};

const diagnosticoToDelete = ref<number | null>(null);

const confirmDeleteModal = (id: number) => {
  diagnosticoToDelete.value = id;
};

const cancelDelete = () => {
  diagnosticoToDelete.value = null;
};

const deleteDiagnostico = async () => {
  if (!diagnosticoToDelete.value) return;
  
  try {
    const res = await api.delete(`diagnosticos/${diagnosticoToDelete.value}`);
    if (res.ok) {
      toast.show(t('toast_success_deleted'), 'success');
      fetchPaciente();
    } else {
      toast.show(res.error || t('toast_error_delete'), 'error');
    }
  } catch (e) {
    toast.show(t('toast_error_network'), 'error');
  } finally {
    diagnosticoToDelete.value = null;
  }
};

const saveDiagnostico = async () => {
  if (!form.value.id_servicio || !form.value.fecha_diagnostico) {
    toast.show(t('toast_error_diag_required'), 'error');
    return;
  }

  isSaving.value = true;
  try {
    // format dates for backend
    const payload = {
      id_paciente: Number(pacienteId),
      id_servicio: Number(form.value.id_servicio),
      fecha_diagnostico: form.value.fecha_diagnostico,
      descripcion: form.value.descripcion,
      sesiones: form.value.sesiones.map(s => ({
        ...s,
        fecha_sesion: new Date(s.fecha_sesion).toISOString()
      }))
    };

    let res;
    if (editingId.value) {
      res = await api.put(`diagnosticos/${editingId.value}`, payload);
    } else {
      res = await api.post('diagnosticos', payload);
    }

    if (res.ok) {
      toast.show(editingId.value ? t('toast_success_updated') : t('toast_success_created'), 'success');
      closeModal();
      fetchPaciente();
    } else {
      toast.show(res.error || t('toast_error_save'), 'error');
    }
  } catch (error) {
    toast.show(t('toast_error_network'), 'error');
  } finally {
    isSaving.value = false;
  }
};

const displayCPF = (cpf: string | number) => {
  if (!cpf) return '';
  const value = String(cpf).replace(/\D/g, '');
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return String(cpf);
};

const displayPhone = (phone: string | number) => {
  if (!phone) return '';
  const value = String(phone).replace(/\D/g, '');
  if (value.length === 11) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (value.length === 10) {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return String(phone);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('T')[0].split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day), 12);
  return date.toLocaleDateString('pt-BR');
};

const formatDateTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

const formatCurrency = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return value;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
</script>
