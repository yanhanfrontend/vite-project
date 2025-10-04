import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.css'
import App from './App.vue'
import './style.css'
import {createPinia} from 'pinia'
import $ from 'jquery'
window.$ = $
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia()
const app = createApp(App)
// app.use(ElementPlus, {size: 'small', zIndex: 3000})
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
