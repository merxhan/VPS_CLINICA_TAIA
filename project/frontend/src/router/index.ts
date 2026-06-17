import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import LandingPage from '../components/layout/LandingPage.vue';
import DashboardLayout from '../components/layout/DashboardLayout.vue';
import Pacientes from '../views/Pacientes.vue';
import Servicios from '../views/Servicios.vue';
import Categorias from '../views/Categorias.vue';
import PacienteView from '../views/PacienteView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LandingPage,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/DashboardHome.vue'),
      },
      {
        path: '/pacientes',
        name: 'pacientes',
        component: Pacientes,
      },
      {
        path: '/pacientes/:id',
        name: 'paciente-view',
        component: PacienteView,
      },
      {
        path: '/servicios',
        name: 'servicios',
        component: Servicios,
      },
      {
        path: '/categorias',
        name: 'categorias',
        component: Categorias,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
