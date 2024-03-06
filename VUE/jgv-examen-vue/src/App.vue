<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <router-link to="/categorias" class="btn"
      ><button type="submit" class="bg-orange-300 p-1 mb-1">CATEGORIAS</button></router-link
    >
    <RouterView />
  </div>
</template>
