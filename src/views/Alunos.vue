<template>
  <div class="">
    <ul>
      <li v-for="aluno in alunos">
        <ul>
          <li>{{aluno.email}}</li>
          <li>{{aluno.cpf}}</li>
          <li>{{aluno.nome}}</li>
          <li>{{aluno.data_nascimento}}</li>
          <li>{{aluno.telefone}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';


export default{
  name: 'Alunos',
  data(){
    return{
      alunos: []
    }
  },
  methods:{

  },
  mounted(){
    let app = this;
    axios.get('list_alunos/').then(function(res){
      console.log(res)
      app.alunos = res.data.results;
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
      }
    },
}
</script>
