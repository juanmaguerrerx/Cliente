import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue';


const routes = [
  {
    path: '/',
    component: Layout, // Aquí usamos el layout como componente principal para todas las rutas
    children: [
      {
        path: 'clientes',
        name: 'clientes',
        component: () => import('@/views/Clientes.vue') // Vista Clientes
      },
      {
        path: 'polizas',
        component: () => import('@/views/Polizas.vue') // Vista Polzias
      },
      {
        path: 'filtros',
        name: 'filtros',
        component: () => import('@/views/Filtro.vue') // Vista Filtros
      }
      // Agrega más rutas según sea necesario
    ]

  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;