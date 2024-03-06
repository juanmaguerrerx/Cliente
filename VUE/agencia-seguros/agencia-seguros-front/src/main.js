import 'tailwindcss/tailwind.css'
import './assets/main.css'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/aura-light-blue/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
.use(router)
.use(ToastService)
.use(PrimeVue)

app.mount('#app')
