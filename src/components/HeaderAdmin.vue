<template>
    <div class="header d-flex px-4">
      <transition name="slide-fade">
        <ul class="menu" v-if="showSidebar">
          <span class="close-menu pointer" @click="showBar"><i class="fas fa-times"></i></span>
          <li><span @click="$router.push('/admin/aulas')">Ver Aulas</span></li>
          <li><span @click="$router.push('/alunos/novo')">Novo aluno</span></li>
          <li><span @click="$router.push('/admin/nova_aula')">Nova aula</span></li>
        </ul>
        </transition>
      <div class=" w-50 text-left">
        <span class="border rounded p-2 pointer" @click="showBar"><i class="fas fa-bars"></i></span>
      </div>
      <span class="w-50 ">Olá {{nome}}</span>
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
  text-align: right;
  padding: 10px 0;
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