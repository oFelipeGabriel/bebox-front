<template>
  <div class="">
  <ul>
    <li>Nome: <input type="text" v-model="nome"></li>
    <li>E-Mail: <input type="email" v-model="email"></li>
    <li>CPF:: <input type="text" v-model="cpf"></li>
    <li>Data de Nascimento: <input type="date" v-model="data_nasc"></li>
    <li>Endereço: <input type="text" v-model="endereco"></li>
    <li>Telefone: <input type="text" v-model="telefone"></li>
    <li>Administrador: <input type="checkbox" v-model="admin"></li>
    <button @click="cadastrar">Cadastrar</button>
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
      data_nasc: '',
      telefone: '',
      endereco: '',
      admin: true
    }
  },
  methods:{
    cadastrar(){
      let dados = {}
      let app = this;
      let d = new Date(this.data_nasc).toISOString();

      dados.nome = this.nome;
      dados.email = this.email;
      dados.cpf = this.cpf;
      dados.autorizacao = this.admin;      
      dados.data_nasc = Date.parse(d);
      dados.telefone = this.telefone;
      dados.endereco = this.endereco;
      console.log('antes', dados)
      axios.post('usuario/novoUsuario', dados).then(res => {
        console.log(dados)
        console.log(res)
        app.$router.push('/alunos')
      }).catch(err => {
        console.log('dados', dados)
        console.log(err)
      })
    }
  },
  mounted(){
    //let app = this;
    // axios.get('list_alunos/').then(function(res){
    //   console.log(res)
    //   app.alunos = res.data.results;
    // }).catch(function(error){
    //   console.log(error)
    // })
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
