import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import LandingPage from '../components/layout/LandingPage.vue';
import DashboardLayout from '../components/layout/DashboardLayout.vue';
import Pacientes from '../views/Pacientes.vue';
import Servicios from '../views/Servicios.vue';
import Categorias from '../views/Categorias.vue';
import PacienteView from '../views/PacienteView.vue';
import { useAuth } from '../composables/useAuth';

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
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuth();
  const isAuthenticated = auth.state.isAuthenticated;
  const user = auth.state.user;

  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' });
    return;
  }

  if (isAuthenticated) {
    if (to.name === 'login' || to.name === 'not-found') {
      if (user?.role === 'paciente') {
        next({ name: 'paciente-view', params: { id: user.id } });
      } else {
        next({ name: 'dashboard' });
      }
      return;
    }

    if (user?.role === 'paciente') {
      if (to.name !== 'paciente-view' || String(to.params.id) !== String(user.id)) {
        next({ name: 'paciente-view', params: { id: user.id } });
        return;
      }
    }
  }

  next();
});

export default router;
