<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
  <div class="row d-flex justify-content-center w-100 pt-5">
    <div class="card col-md-10 py-3">
      <div class="form-group">
        <label class="w-100 text-left">Dia: </label>
        <b-form-input type="date" v-model="dia"></b-form-input>
      </div>
      <div class="form-group">
        <label class="w-100 text-left">Hora: </label>
        <b-form-input type="time" v-model="hora"></b-form-input>
      </div>
      <div class="form-group">
        <label class="w-100 text-left">Quantidade: </label>
        <b-form-input type="number" v-model="quantidade"></b-form-input>
      </div>
      <b-button type="button" @click="cadastrar">Cadastrar</b-button>
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
      alunos: [],
      dia: '',
      hora: null,
      quantidade: 0
    }
  },
  methods:{
    cadastrar(){
      let dados = {}
      let d = new Date(this.dia).toISOString();
      let app = this
      dados.dia = Date.parse(d);
      dados.hora = this.hora;
      dados.quantidade = this.quantidade;
      dados.alunos_id = [];
      axios.post('aula/novaAula', dados).then(res => {
        app.$router.push('/admin/aulas')
      }).catch(err => {
        console.log(err)
      })
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
