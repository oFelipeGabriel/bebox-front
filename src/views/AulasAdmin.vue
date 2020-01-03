<template>
  <div>
    <div class="hamb" >
    <span @click="showBar">MENU</span>
    </div>
    <transition name="slide-fade">
    <ul class="menu" v-if="showSidebar">
      <li><a href="/alunos/novo">Novo aluno</a></li>
      <li><a href="/nova-aula">Nova aula</a></li>
    </ul>
    </transition>
    <div class="tabela row table w-100">
      <div class="col-md-3">
        Dia
      </div>
      <div class="col-md-3">
        Hora
      </div>
      <div class="col-md-3">
        Quantidade máxima
      </div>
    </div>
    <div  v-for="aula in aulas">
      <div class="tabela">
        <div>{{setDate(aula.dia).getDate()}}/{{meses[setDate(aula.dia).getMonth()]}}</div>
        <div>{{setHour(aula.hora)}} Hrs</div>
        <div>{{aula.quantidade}}</div>
      </div>
      <ul>
        <li v-for="aluno in aula.alunos">
          <div>{{aluno.nome}}</div>
        </li>
      </ul>

  </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';


export default{
  name: 'Alunos',
  data(){
    return{
      aulas: [],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      showSidebar: false,
    }
  },
  methods:{
    setDate(date){
      return new Date(date)
    },
    setHour(hora){
      let h = hora.split(':')[0]
      let m = hora.split(':')[1]
      return h+':'+m
    },
    showBar(){
      this.showSidebar = !this.showSidebar
    }
  },
  mounted(){
    let app = this;
    let admin = this.$store.getters.isAdmin
    axios.get('aula/getAll').then(function(res){
      console.log(res)
      app.aulas = res.data;
    }).catch(function(error){
      console.log(error)
    })
  },
  computed:{
    isAdmin:{
      get(){
        return store.getters.isAdmin
      }
    },
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
    id:{
      get(){
        return this.$store.state.userid;
      }
    }
  },
}
</script>

<style lang="scss">
.hamb{
  width: 100%;
  text-align: center;
}
.menu{
  width: 150px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  background-color: $secondary;
  z-index: 100;
}
.menu li{
  padding: 20px 5px;
  text-align: left
}
.menu li a{
  text-decoration: none;
  color: $primary;
  font-weight: bolder;
  text-align: left
}
.tabela{
  display: flex;
}
.tabela div{
  flex: 1
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
