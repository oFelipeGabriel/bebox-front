import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login.vue";
import Index from "@/views/Index.vue";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/login",
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/aulas',
      name: 'aulas',
      component: Index
    },
    //{ path: "*", component: NotFound },


  ]

})


export default router;
