<template>
  <div class="">
  <a href="/alunos/novo">Novo</a>
  <a href="/aulas">Ver aulas</a>
    <table>
      <tr>
        <th>Dia</th>
        <th>Hora</th>
        <th>Quantidade máxima</th>
      </tr>
    </table>
    <div  v-for="aula in aulas">
      <div>
        <div>{{setDate(aula.dia).getDate()}}/{{meses[setDate(aula.dia).getMonth()]}} - {{setHour(aula.hora)}} Hrs</div>
        <div>{{aula.quantidade}}</div>
      </div>
      <div v-for="aluno in aula.alunos">
        <div>{{aluno.nome}}</div>
      </div>
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
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
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
  },
  mounted(){
    let app = this;
    let admin = this.$store.getters.isAdmin
    axios.get('admin/aulas').then(function(res){
      console.log(res)
      app.aulas = res.data.results;
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
