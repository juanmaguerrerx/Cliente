<template>
    <div class="my-component">
        <h1 v-if="isVisible">{{ mensaje }}</h1>
        <button v-on:click="cambiarVis">Cambiar visibilidad</button>
    </div>
</template>

<script>
export default {
    name: 'MyComponet',
    data() {
        return {
            mensaje: 'Hola lambebicho',
            isVisible: true
        }
    },
    methods: {
        cambiarVis() {
            this.isVisible = !this.isVisible;
        }
    }
}
</script>