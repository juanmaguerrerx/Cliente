<template>
  <div class="flex flex-wrap justify-center gap-6">
    <router-link to="/cart"><button type="submit"></button></router-link>
    <div v-for="category in categories" :key="category.id" @click="navigateToCategory(category)">
      <Card class="w-64 cursor-pointer">
        <template #title>
          <h2 class="text-xl font-bold">{{ category.name }}</h2>
        </template>
        <template #content>
          <img :src="category.image" alt="Category Image" class="w-full h-auto" />
        </template>
      </Card>
    </div>
  </div>

  <footer>
    <CategoryButtons />
  </footer>
</template>

<script>
import { ref } from 'vue'
import Card from 'primevue/card'
import axios from 'axios'
import CategoryButtons from './CategoryButtons.vue'

export default {
  components: {
    Card,
    CategoryButtons
  },
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
    },
    navigateToCategory(category) {
      this.$router.push({ name: 'CategoriaDetail', params: { categoriaId: category.id } })
    }
  }
}
</script>
