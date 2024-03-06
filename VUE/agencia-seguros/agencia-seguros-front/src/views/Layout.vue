<template>
    <div class="layout">
        <nav aria-label="menu nav"
            class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 nav-superior">

            <div class="flex flex-wrap items-center">
                <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                    <a href="#" aria-label="Home">
                        <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
                    </a>
                </div>

                <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                    <span class="relative w-full">
                        <h1 class="text-center text-xl tracking-widest">Seguros Do Carmo S.L</h1>
                    </span>
                </div>

                <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                    <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">

                        <li class="flex-1 md:flex-none md:mr-3">
                            <RouterLink to="/login" class="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                                href="#"><i class="bi bi-box-arrow-right md:pr-3 fa-lg"></i>Cerrar Sesión</RouterLink>
                        </li>

                    </ul>
                </div>
            </div>

        </nav>

        <nav aria-label="alternative nav" class="nav-lateral">
            <div
                class="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center shadow">

                <div
                    class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                    <ul
                        class="list-reset mt-5 flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                        <li class="mr-3 flex-1 mb-1">
                            <RouterLink to="/clientes"
                                class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                <i class="bi bi-people pr-0 md:pr-3"></i><span
                                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Clientes</span>
                            </RouterLink>
                        </li>
                        <li class="mr-3 flex-1 mb-1">
                            <RouterLink to="/polizas"
                                class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                <i class="bi bi-receipt-cutoff pr-0 md:pr-3"></i><span
                                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Pólizas</span>
                            </RouterLink>
                        </li>
                        <li class="mr-3 flex-1">
                            <RouterLink to="/filtro"
                                class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-500">
                                <i class="bi bi-search pr-0 md:pr-3"></i><span
                                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Búsqueda</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
        <div id="main" class="w-full absolute top-[45px] h-full overflow-y-scroll ml-[190px] p-5 flex-1 mt-12 md:mt-2 pb-24 md:pb-5">
            <RouterView />
        </div>

    </div>
</template>

<script>
export default {
    name: 'Layout'
}
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.nav-lateral {
    width: 48px;
    /* Ancho de la navegación lateral */
    flex-shrink: 0;
    /* Evita que la navegación lateral se contraiga */
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
}

.nav-superior {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
    flex: 1;
    padding: 20px;
    margin-left:190px;
    position: absolute;
    top: 45px;
    height: 602px;
    overflow-y: auto;
}
</style>