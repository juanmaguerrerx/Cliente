<!-- CategoryButtons.vue -->

<template>
  <div class="mt-44">
    <h3 class="text-xl font-bold">Categorías</h3>
    <div class="flex flex-wrap gap-2">
      <router-link
        v-for="category in categories"
        :key="category.id"
        :to="`/categorias/${category.id}`"
        class="btn"
        ><button class="text-purple-700 hover:text-purple-500">
          {{ category.name }}
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
</style>
