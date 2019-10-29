<template>
  <div class="">
  <ul>
    <li>Nome: <input type="text" v-model="nome"></li>
    <li>E-Mail: <input type="email" v-model="email"></li>
    <li>CPF:: <input type="text" v-model="cpf"></li>
    <li>Plano: <input type="text" v-model="plano"></li>
    <li>Vencimento: <input type="number" v-model="vencimento"></li>
    <li>Telefone: <input type="number" v-model="telefone"></li>
    <li>Endereço: <input type="number" v-model="endereco"></li>
    <button type="button" @click="cadastrar">Cadastrar</button>
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
      nome: '',
      email: '',
      cpf: '',
      plano: '',
      vencimento: '',
      telefone: '',
      endereco: '',
    }
  },
  methods:{
    cadastrar(){
      let dados = {}
      let app = this;
      dados.nome = this.nome;
      dados.email = this.email;
      dados.cpf = this.cpf;
      dados.plano = this.plano;
      dados.vencimento = this.vencimento;
      dados.telefone = this.telefone;
      dados.endereco = this.endereco;
      dados.is_admin = false
      dados.password = ''
      //dados.alunos = [];
      let headers = [
        {"Access-Control-Allow-Origin": "*"}
      ]
      axios.post('/list_alunos/', dados).then(res => {
        console.log(res)
        app.$router.push('/alunos')
      }).catch(err => {
        console.log(err)
      })
    }
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
