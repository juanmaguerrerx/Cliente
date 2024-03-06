<template>
    <!-- page -->
    <main class="mx-auto flex min-h-screen w-full h-full items-center justify-center bg-gray-900 text-white">
        <!-- component -->
        <section class="flex w-[30rem] flex-col space-y-10">
            <div class="text-center text-4xl tracking-widest">Seguros Do Carmo S.L</div>
            <div class="text-center text-4xl font-medium">Iniciar Sesión </div>

            <div class="text-center">
                (user:usuario | password: usuario)
            </div>
            <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                <input type="text" id="userLog" placeholder="Usuario"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>

            <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                <input type="password" id="passLog" placeholder="Contraseña"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>

            <span class="text-center text-red-500" id="mensaje" hidden>Login incorrecto</span>

            <Button class="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400" label="LOGIN"
                @click="checkLogin" />
        </section>
    </main>
</template>

<script>
import Button from 'primevue/button';

export default {
    name: 'Login',
    components: {
        Button,
    },
    methods: {
        checkLogin() {
            let mensaje = document.getElementById('mensaje');
            let userLog = document.getElementById('userLog');
            let passLog = document.getElementById('passLog');
            console.log(userLog.value, passLog.value);

            if (userLog.value == 'usuario' && passLog.value == 'usuario') {
                this.$router.push({ name: 'clientes' }); // Utiliza this.$router en lugar de router
            } else {
                console.log("error");
                mensaje.setAttribute('hidden','false');
                mensaje.innerHTML = 'Login incorrecto';
            }
        }
    }
}
</script>
