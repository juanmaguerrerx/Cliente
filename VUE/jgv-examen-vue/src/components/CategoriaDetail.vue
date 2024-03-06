<template>
  <div class="p-4">
    <h1 class="text-center text-2xl tracking-widest">Productos</h1>
    <router-link to="/busqueda" class="btn"
      ><button type="submit" class="bg-orange-300 p-1 mb-1">Busqueda avanzada</button></router-link
    ><br />
    <router-link to="/cart" class="btn"
      ><button type="submit" class="bg-green-500 p-1 mb-1">Carrito</button></router-link
    >
    <router-link to="/" class="btn"
      ><button
        type="submit"
        class="flex mb-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Volver
      </button></router-link
    >
    <DataView :value="products" paginator :rows="5">
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
</template>

<script>
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import axios from 'axios'

export default {
  components: {
    Button,
    DataView
  },
  data() {
    return {
      products: [],
      categoryName: ''
    }
  },
  created() {
    const categoryId = this.$route.params.categoriaId
    const categoryName = this.$route.params.categoriaName
    if (categoryId) {
      this.fetchProducts(categoryId)
      this.categoryName = categoryName
    } else {
      console.error('Category ID is not defined.')
    }
  },
  methods: {
    async fetchProducts(categoryId) {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products')
        this.products = response.data.filter((product) => product.category.id == categoryId)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
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
