import 'primevue/resources/themes/aura-dark-green/theme.css'
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index, // Aquí usamos el layout como componente principal para todas las rutas
    
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
