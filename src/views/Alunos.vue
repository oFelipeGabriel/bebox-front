<template>
  <div class="">
  <a href="/alunos/novo">Novo</a>
  <a href="/aulas">Ver aulas</a>
    <table>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>CPF</th>
        <th>Plano</th>
        <th>Vencimento</th>
        <th>Data de nascimento</th>
        <th>Telefone</th>
        <th>Endereço</th>
      </tr>
    <tr v-for="aluno in alunos">
      <td>{{aluno.nome}}</td>
      <td>{{aluno.email}}</td>
      <td>{{aluno.cpf}}</td>
      <td>{{aluno.plano}}</td>
      <td>{{aluno.vencimento}}</td>
      <td>{{aluno.data_nascimento}}</td>
      <td>{{aluno.telefone}}</td>
      <td>{{aluno.endereco}}</td>
    </tr>

  </table>
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
    axios.get('usuario/getAllAdmin').then(function(res){
      console.log(res)
      app.alunos = res.data;
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
