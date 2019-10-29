<template>
  <div class="">
    <div class="header">
      <span>Ola {{nome}}</span>
    </div>
    <ul>
      <li v-for="aula in aulas">
        <h2>{{setDate(aula.dia).getDate()}}/{{meses[setDate(aula.dia).getMonth()]}} - {{setHour(aula.hora)}} Hrs</h2>
        <h2>Total: {{aula.quantidade}}</h2>
        <h2>Ja inscritos: {{aula.alunos_id.length}}</h2>
        <h2 v-if="!verificaAula(aula) && !verificaLimite(aula)">Limite atingido</h2>
        <h2 v-else-if="!verificaAula(aula)" @click="fazerCheckin(aula)">Fazer check-in</h2>
        <h2 v-else @click="desfazerCheckin(aula)">Desfazer Check-in</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';


export default{
  name: 'Index',
  data(){
    return{
      aulas: [],
      id: null,
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    }
  },
  methods:{
    fazerCheckin(aula){
      aula.alunos_id.push(this.id)
      axios.put('list_aulas/'+aula.id+'/', aula).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    desfazerCheckin(aula){
      let index = aula.alunos_id.indexOf(this.id);
      aula.alunos_id.splice(index, 1);
      axios.put('list_aulas/'+aula.id+'/', aula).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    verificaLimite(aula){
        console.log('alunos', aula.alunos_id.length, 'aulas', aula.quantidade)
      if(aula.quantidade == aula.alunos_id.length){
        return false
      }else{
        return true
      }
    },
    setDate(date){
      return new Date(date)
    },
    setHour(hora){
      let h = hora.split(':')[0]
      let m = hora.split(':')[1]
      return h+':'+m
    },
    verificaAula(aula){
      for(let a in aula.alunos_id){
        if(aula.alunos_id[a]==this.id){
          return true
        }
      }
      return false
    }
  },
  mounted(){
    let app = this;
    axios.get('list_aulas/').then(function(res){
      console.log(res.data)
      app.aulas = res.data

    }).catch(function(error){
      console.log(error)
    })
    if(this.$store.state.admin){
      this.$router.push('/admin/aulas')
    }
    if(this.$store.state.userid==null){
      this.$router.push('/login')
    }else{
      this.id = this.$store.state.userid;
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
.header span{
  padding: 10%;
}
ul{
  list-style: none;
  background-color: $secondary;
}
</style>
