import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import axios from 'axios'

import { createBootstrap } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './registerServiceWorker';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const app = createApp(App)
const bootstrap = createBootstrap()

app.use(store)
app.use(router)
app.use(bootstrap)
app.component('v-select', vSelect)

app.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_ROOT_URL

axios.interceptors.request.use(config => {
  if(store.state.token) {
    config.headers.Authorization = 'Bearer '+store.state.token
  }
  return config
})

axios.interceptors.response.use(res => {
    return res
  }, error => {
    throw error
})

app.mount('#app')
