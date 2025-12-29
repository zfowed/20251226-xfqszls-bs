// import './mock'
import '@/utils/authorized'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import appConfig from '@/config'
import '@/assets/global/scss/global.scss'
import 'animate.css'
import './style.scss'

Object.assign(appConfig.value || {}, {
  useUE: false,
  useScale: false
})

const app = createApp(App)
app.use(router)
app.mount('#app')
