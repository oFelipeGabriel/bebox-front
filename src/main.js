import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
//axios.defaults.baseURL = 'https://bebox-sjc.herokuapp.com/'
axios.defaults.baseURL = process.env.VUE_APP_ROOT_URL
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  if(store.state.token) {
    config.headers.Authorization = 'Bearer '+store.state.token
  }
  return config
})

axios.interceptors.response.use(res => {
    return res
  }, error => {
    // if(error.response.status === 403) {
    //   alert('Não autorizado!')
    //   //store.commit('logout')
    //   router.push('/login')
    // }
    // else if (error.response.status === 401) {
    //   //store.commit('logout')
    //   router.push('/login')
    // }
    throw error
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
