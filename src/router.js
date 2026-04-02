import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Index from "@/views/Index.vue";
import Landing from "@/views/Landing.vue";
import Alunos from "@/views/Alunos.vue";
import AddAluno from "@/views/AddAluno.vue";
import NovaAula from "@/views/NovaAula.vue";
import AulasAdmin from "@/views/AulasAdmin.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
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
      path: '/admin/nova_aula',
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
