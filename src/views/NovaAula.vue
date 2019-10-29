<template>
  <div class="">
    Dia: <input type="date" v-model="dia">
    Hora: <input type="time" v-model="hora">
    Quantidade: <input type="number" v-model="quantidade">
    <button type="button" @click="cadastrar">Cadastrar</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';


export default{
  name: 'Alunos',
  data(){
    return{
      alunos: [],
      dia: new Date(),
      hora: null,
      quantidade: 0
    }
  },
  methods:{
    cadastrar(){
      let dados = {}
      dados.dia = this.dia;
      dados.hora = this.hora;
      dados.quantidade = this.quantidade;
      //dados.alunos = [];
      let headers = [
        {"Access-Control-Allow-Origin": "*"}
      ]
      axios.post('/list_aulas/', dados, {headers: {"Access-Control-Allow-Origin": "*"}}).then(res => {
        console.log(res)
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
