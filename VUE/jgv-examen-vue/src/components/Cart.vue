<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Carrito de la compra</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="(item, index) in cartItems" :key="index" class="mb-4 border-b pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <div>
            <input type="number" v-model="item.quantity" min="1" @change="updateQuantity(index)" />
            <button @click="removeItem(index)">Eliminar</button>
          </div>
        </div>
        <div>
          <p>Precio: ${{ item.price }}</p>
          <p>Subtotal: ${{ item.quantity * item.price }}</p>
        </div>
      </div>
      <div>
        <p>Total: ${{ getTotal() }}</p>
      </div>
    </div>
    <div v-else>
      <p>El carrito está vacío.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [] // Array para almacenar los artículos en el carrito
    }
  },
  methods: {
    updateQuantity(index) {
      // Actualizar la cantidad de artículos en el carrito
      if (this.cartItems[index].quantity < 1) {
        this.cartItems[index].quantity = 1
      }
    },
    removeItem(index) {
      // Eliminar un artículo del carrito
      this.cartItems.splice(index, 1)
    },
    getTotal() {
      // Calcular el total del carrito
      return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    }
  }
}
</script>
