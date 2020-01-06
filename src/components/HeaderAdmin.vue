<template>
    <div class="header d-flex">
      <transition name="slide-fade">
        <ul class="menu pl-2" v-if="showSidebar">
          <span class="close-menu pointer" @click="showBar"><i class="fas fa-times"></i></span>
          <li class="px-4 pt-0 pb-2 border-bottom"><img src="../assets/img/logo.png" alt="Bebox - Desafiando você a viver melhor" class="logo-sidebar"></li>
          <li @click="$router.push('/admin/aulas')" class="border-bottom"><span>Ver Aulas</span></li>
          <li @click="$router.push('/alunos')" class="border-bottom"><span>Ver Alunos</span></li>
          <li @click="$router.push('/alunos/novo')" class="border-bottom"><span>Novo aluno</span></li>
          <li @click="$router.push('/admin/nova_aula')" class="border-bottom"><span>Nova aula</span></li>
        </ul>
        </transition>
      <div class=" col-md-4 text-left pt-2">
        <span class="border rounded p-2 pointer" @click="showBar"><i class="fas fa-bars"></i></span>
      </div>
      <div class="col-md-4 text-center secondary-bg">
        <img src="../assets/img/logo.png" alt="Bebox - Desafiando você a viver melhor" class="logo-header">
      </div>
      <b-dropdown :text="'Olá, '+nome" id="drop-nome" block variant="primary-base" offset="55" class="col-md-4 pt-1 text-right">
        <b-dropdown-item @click="$store.commit('logout')">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
</template>

<script>
export default{
  name: 'Header',
  data(){
    return{
      showSidebar: false,
    }
  },
  computed:{
    token:{
      get(){
        return this.$store.state.token;
      }
    },
    username:{
      get(){
        return this.$store.state.usuario;
      }
    },
    admin:{
      get(){
        return this.$store.state.admin;
      }
    },
    nome:{
      get(){
        return this.$store.getters.getNome
      }
    }
  },
  methods:{
    showBar(){
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style lang="scss">
.header{
  color: #ccc;
  background-color: $primary;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: right;
  padding: 10px 0.5rem;
}
.logo-header{
  height: 100%;
}
.logo-sidebar{
  height: 50px;
}
.secondary-bg{
  background-color: $secondary;
  border-radius: 10px;
}
#drop-nome button{
  background-color: $primary;
  border: 0;
  text-align: right;
}
.dropdown-menu{
  right: 0 !important;
  min-width: 5rem !important;
}
.btn-primary-base{
  color: $secondary !important;
}
ul{
  list-style: none;
  background-color: $secondary;
}
.pointer{
  cursor: pointer;
}
.close-menu{
  position: absolute;
  color: #252626;
  right: 10px;
  top: 3px;
}
.menu{
  width: 175px;
  height: 100%;
  padding-top: 20px;
  padding-right: 10px;
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  background-color: $secondary;
  z-index: 100;
  border: 6px solid $primary;
}
.menu li{
  padding: 20px 5px;
  text-align: left;
  transition: 0.7s ease;
}
.menu li span{
  text-decoration: none;
  cursor: pointer;
  color: $primary;
  font-weight: bolder;
  text-align: left
}
.menu li:hover{
  background-color: $primary;
}
.menu li:hover span{
  color: $secondary
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s ease/*cubic-bezier(1.0, 0.5, 0.8, 1.0)*/;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-150px);
  opacity: 0;
}
  </style>