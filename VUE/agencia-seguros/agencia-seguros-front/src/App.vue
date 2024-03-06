<template>
  <div id="app">
    <router-link to="/login" class="btn">IR A LA PRACTICA</router-link>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink,RouterView } from 'vue-router'
export default {
  name: 'App'
};
</script>