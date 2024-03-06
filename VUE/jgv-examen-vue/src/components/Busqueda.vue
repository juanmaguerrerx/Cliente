<template>
  <div class="p-4">
    <router-link to="/" class="btn"
      ><button
        type="submit"
        class="flex mb-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Volver
      </button></router-link
    >
    <form>
      <div class="flex flex-col sm:flex-row gap-4">
        <div>
          <label for="category">Categoría:</label>
          <select v-model="selectedCategory" id="category" @input="filterProducts">
            <option value="">Todas</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="minPrice">Precio mínimo:</label>
          <input type="number" v-model.number="minPrice" id="minPrice" @input="filterProducts" />
        </div>
        <div>
          <label for="maxPrice">Precio máximo:</label>
          <input type="number" v-model.number="maxPrice" id="maxPrice" @input="filterProducts" />
        </div>
      </div>
    </form>

    <div class="mt-4" v-if="filteredProducts.length > 0">
      <h2 class="text-xl font-bold">Resultados del filtro</h2>
      <DataView :value="filteredProducts" paginator :rows="5">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div
                class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }"
              >
                <div class="md:w-10rem relative">
                  <img
                    class="block xl:block mx-auto border-round w-40"
                    :src="item.images[0]"
                    :alt="item.title"
                  />
                </div>
                <div
                  class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
                >
                  <div
                    class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
                  >
                    <div>
                      <span class="font-medium text-secondary text-sm">{{ categoryName }}</span>
                      <div class="text-lg font-medium text-900 mt-2">{{ item.title }}</div>
                    </div>
                  </div>
                  <div class="flex flex-column md:align-items-end gap-5">
                    <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button icon="pi pi-heart" outlined></Button>
                      <Button
                        icon="pi pi-shopping-cart"
                        label="Buy Now"
                        class="flex-auto md:flex-initial white-space-nowrap"
                        @click="addToCart(item)"
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <div v-else-if="loading">Cargando...</div>
    <div v-else>No se encontraron productos con los criterios de búsqueda seleccionados.</div>
  </div>

  <!-- <div>
        {{ filteredProducts }}
    </div> -->
</template>

<script>
import axios from 'axios'
import DataView from 'primevue/dataview'
import Button from 'primevue/button'

export default {
  components: {
    DataView,
    Button
  },

  name: 'Busqueda',
  data() {
    return {
      categories: [],
      selectedCategory: '',
      minPrice: null,
      maxPrice: null,
      products: [],
      filteredProducts: [],
      loading: false
    }
  },
  created() {
    this.fetchCategories()
    this.fetchAllProducts()
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
    async fetchAllProducts() {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products')
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    filterProducts() {
      this.loading = true
      this.filteredProducts = this.products.filter((product) => {
        const categoryMatch =
          !this.selectedCategory || product.category.id === this.selectedCategory
        const minPriceMatch = !this.minPrice || product.price >= this.minPrice
        const maxPriceMatch = !this.maxPrice || product.price <= this.maxPrice
        return categoryMatch && minPriceMatch && maxPriceMatch
      })
      this.loading = false
    },
    addToCart(product) {
      // Añadir un producto al carrito de la compra
      const existingItem = this.$parent.cartItems.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.$parent.cartItems.push({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          quantity: 1
        })
      }
    }
  }
}
</script>
