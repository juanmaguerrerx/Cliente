<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MyComponent></MyComponent>
</template>

<script>
import MyComponent from './components/MyComponent.vue';
export default {
  name: 'App',
  components: {
    MyComponent
  }
}
</script>

<style>
  *{
    text-align: center;
  }
</style>