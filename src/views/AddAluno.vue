<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="row d-flex justify-content-center">
    <div class="card col-md-10 py-3">
        <div class="form-group">
          <label class="w-100 text-left">Nome: </label>
          <b-form-input type="text" v-model="nome"></b-form-input>
        </div>
        <div class="form-group">
          <label class="w-100 text-left">E-Mail: </label>
          <b-form-input type="email" v-model="email"></b-form-input>
        </div>
        <div class="form-group">
          <label class="w-100 text-left">CPF: </label>
          <b-form-input type="text" v-model="cpf"></b-form-input>
        </div>
        <div class="form-group">
          <label class="w-100 text-left">Data de Nascimento: </label>
          <b-form-input type="date" v-model="data_nasc"></b-form-input>
        </div>
        <div class="form-group">
          <label class="w-100 text-left">Endereço: </label>
          <b-form-input type="text" v-model="endereco"></b-form-input>
        </div>
        <div class="form-group">
          <label class="w-100 text-left">Telefone: </label>
          <b-form-input type="text" v-model="telefone"></b-form-input>
        </div>
        <div class="form-group border rounded pl-1">
          <label class="w-25 text-left float-left mt-2">Administrador: </label>
          <b-form-checkbox type="checkbox" class="w-25 text-left mt-2" v-model="admin"></b-form-checkbox>
        </div>
        <b-button @click="cadastrar">Cadastrar</b-button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import HeaderAdmin from '../components/HeaderAdmin.vue'

export default{
  name: 'Alunos',
  components: {
    HeaderAdmin
  },
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
      admin: false
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
