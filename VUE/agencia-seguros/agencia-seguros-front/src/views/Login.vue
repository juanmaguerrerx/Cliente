<template>
    <!-- page -->
    <main class="mx-auto flex min-h-screen w-full h-full items-center justify-center bg-gray-900 text-white">
        <Toast />
        <!-- component -->
        <section class="flex w-[30rem] flex-col space-y-10">
            <div class="text-center text-4xl tracking-widest">Seguros Do Carmo S.L</div>
            <div class="text-center text-4xl font-medium">Iniciar Sesión </div>

            <div class="text-center">
                (user:usuario | password: usuario)
            </div>
            <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                <input type="text" v-model="username" placeholder="Usuario"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>

            <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                <input type="password" v-model="password" placeholder="Contraseña"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>

            <Button class="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400" label="LOGIN"
                @click="checkLogin" />
        </section>
    </main>
</template>

<script>
import Button from 'primevue/button';
import Toast from "primevue/toast"

export default {
    name: 'Login',
    components: {
        Button,
        Toast,
    },
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        checkLogin() {
            if (this.username == '' || this.password == '') {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Rellena ambos campos', life: 3000 });
            } else {
                if (this.username !== 'usuario' || this.password !== 'usuario') {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas', life: 3000 });
                } else {
                    this.$router.push({ name: 'clientes' }); // Utiliza this.$router en lugar de router
                }
            }
        }
    }
}
</script>
