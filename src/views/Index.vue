<template>
  <div class="">
    Ola {{nome}}
    <ul>
      <li v-for="aula in aulas">
        <h2>{{aula.dia}}</h2>
        <h2>{{aula.hora}}</h2>
        <h2>{{aula.quantidade}}</h2>
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
      aulas: []
    }
  },
  methods:{
    fazerCheckin(aula){
      aula.alunos.push(this.id)
      axios.put('list_aulas/'+aula.id+'/', aula).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    desfazerCheckin(aula){
      let aluno = aula.alunos.filter(aluno => {return aluno==this.id})[0]
      let index = aula.alunos.indexOf(aluno);
      aula.alunos.splice(index, 1);
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
    verificaAula(aula){
      for(let a in aula.alunos){
        if(aula.alunos[a]==this.id){
          return true
        }
      }
      return false
    }
  },
  mounted(){
    let app = this;
    axios.get('list_aulas/').then(function(res){
      app.aulas = res.data;
    }).catch(function(error){
      console.log(error)
    })
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
      id:{
        get(){
          return this.$store.state.userid;
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
