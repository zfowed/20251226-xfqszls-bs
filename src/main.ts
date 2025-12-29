import '@/utils/authorized'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/config'
import './assets/global/scss/global.scss'
import 'animate.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
