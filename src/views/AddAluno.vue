<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="row d-flex justify-content-center px-3">
      <div class="row col-md-10 pl-0 mb-2">
        <div class="col-md-4 pl-0 text-left">
          <button type="button" name="button" class="btn btn-primary" @click="$router.go(-1)">Voltar</button>
        </div>
      </div>
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
        <div class="form-group">
          <label class="w-100 text-left">Valor mensalidade: </label>
          <b-form-input type="number" v-model="mensalidade"></b-form-input>
        </div>
        <div class="form-group">
          <label class="w-100 text-left">Vencimento da mensalidade: </label>
          <b-form-input type="date" v-model="data_vencimento"></b-form-input>
        </div>
        <div class="form-group border rounded pl-1 mt-2">
          <b-form-checkbox v-model="admin" name="check-button" class="border rounded col-6" button :button-variant="admin?'secondary':'primary-base'">
            Administrador: <b>{{ admin?'Sim':'Não' }}</b>
          </b-form-checkbox>
          <b-form-checkbox v-model="ativo" name="check-button" class="border rounded col-6" button :button-variant="ativo?'secondary':'primary-base'">
            Ativo: <b>{{ ativo?'Sim':'Não' }}</b>
          </b-form-checkbox>
        </div>
        <div class="form-group border-rounded">
          
        </div>
        <b-button @click="cadastrar">{{editar?'Atualizar':'Cadastrar'}}</b-button>
    </div>
    <div class="card col-md-10 py-3" v-if="id_editar">
      <div class="form-group">
        <label class="w-100 text-left">Senha: </label>
        <b-form-input type="text" v-model="senha"></b-form-input>
      </div>
      <b-button @click="atualizaSenha">Atuaizar</b-button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin.vue'

export default{
  name: 'Alunos',
  components: {
    HeaderAdmin
  },
  data(){
    return{
      editar: false,
      nome: '',
      email: '',
      cpf: '',
      plano: '',
      vencimento: '',
      data_nasc: '',
      telefone: '',
      endereco: '',
      mensalidade: '',
      data_vencimento: '',
      id_editar: null,
      admin: false,
      senha: '',
      ativo: true
    }
  },
  methods:{
    cadastrar(){
      let dados = {}
      let app = this;
      let d = new Date(this.data_nasc).toISOString();
      let vencimento = new Date(this.data_vencimento).toISOString();

      dados.nome = this.nome;
      dados.email = this.email;
      dados.cpf = this.cpf;
      dados.autorizacao = this.admin;
      dados.data_nasc = Date.parse(d);
      dados.telefone = this.telefone;
      dados.endereco = this.endereco;
      dados.data_vencimento = Date.parse(vencimento);
      dados.mensalidade = this.mensalidade;
      if(this.id_editar){
        axios.put('usuario/editar/'+this.id_editar, dados).then( () => {
          app.$router.push('/alunos')
        })
      }else{
        axios.post('usuario/novoUsuario', dados).then(() => {
          app.$router.push('/alunos')
        })//.catch(err => {
        //   console.log(err)
        // })
      }
    },
    atualizaSenha(){
      let senha = {
        'senha': this.senha
      }
      axios.put('/usuario/editarSenha/'+this.id_editar, senha).then(() => {
        this.senha = ''
      })
    },
    atializaStatus(){
      if(this.editar){
        let body = {
          id: this.id_editar,
          status: this.ativo
        }
        axios.post('/usuario/atualizaStatus', body).then(() => {
          
        })
      }
    },
    convertData(data){
      if(data != null){
        let date = data.split('/')
        let d = date[0]
        let m = date[1]
        let a = date[2]
        return a+'-'+m+'-'+d
      }else{
        return null
      }

    }
  },
  watch:{
    ativo(){
      this.atializaStatus();
    }
  },
  mounted(){
    let u = this.$store.getters.getUsuarioEditar
    if(u){
      this.editar = true;
      this.nome = u.nome
      this.email = u.email
      this.cpf = u.cpf
      this.autorizacao = u.autorizacao
      this.data_nasc = this.convertData(u.data_nascimento)
      this.telefone = u.telefone
      this.endereco = u.endereco
      this.data_vencimento = this.convertData(u.dataVencimento)
      this.mensalidade = u.valor_mensalidade
      this.id_editar = u.id;
      this.ativo = u.status;
      this.$store.commit('setUsuarioEditarToNull')
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
      id:{
        get(){
          return this.$store.state.userid;
        }
      }
    },
}
</script>
