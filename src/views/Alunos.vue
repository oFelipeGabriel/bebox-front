<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="card col-md-12">
      <b-table responsive striped hover :items="alunos" :fields="fields"></b-table>
      
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
      fields:[
        'nome', 'email', 'endereco', 'telefone', 'cpf'
      ]
    }
  },
  methods:{

  },
  mounted(){
    let app = this;
    axios.get('usuario/getAll').then(function(res){
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
