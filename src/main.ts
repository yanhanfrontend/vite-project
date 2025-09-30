import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './style.css'
import {createPinia} from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus, {size: 'small', zIndex: 3000})
app.use(pinia)
app.mount('#app')
