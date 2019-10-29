import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login.vue";
import Index from "@/views/Index.vue";
import Alunos from "@/views/Alunos.vue";
import AddAluno from "@/views/AddAluno.vue";
import NovaAula from "@/views/NovaAula.vue";
import AulasAdmin from "@/views/AulasAdmin.vue";

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
    {
      path: '/alunos',
      name: 'alunos',
      component: Alunos
    },
    {
      path: '/alunos/novo',
      name: 'novo-aluno',
      component: AddAluno
    },
    {
      path: '/nova-aula',
      name: 'nova-aula',
      component: NovaAula
    },
    {
      path: '/admin/aulas',
      name: 'aulas-admin',
      component: AulasAdmin
    },
    //{ path: "*", component: NotFound },


  ]

})


export default router;
