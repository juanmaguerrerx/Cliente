import { createRouter, createWebHistory } from 'vue-router'
import Categorias from '../components/Categorias.vue'
import CategoriaDetail from '../components/CategoriaDetail.vue'
import Busqueda from '@/components/Busqueda.vue'
import Cart from '@/components/Cart.vue' // Importa el componente Cart.vue

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/categorias'
    },
    {
      path: '/categorias',
      component: Categorias
    },
    {
      path: '/categorias/:categoriaId',
      name: 'CategoriaDetail',
      component: CategoriaDetail,
      props: true
    },
    {
      path: '/busqueda',
      name: 'Busqueda',
      component: Busqueda
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})

export default router
