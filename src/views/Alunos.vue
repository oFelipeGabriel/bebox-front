<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="card col-md-12">
      <b-table responsive striped hover :items="alunos" :fields="fields" @row-clicked="editarAluno">
        <template v-slot:cell(actions)="data">
          <b-button class="btn btn-danger" @click="apagar(data)"><i class="fas fa-times"></i></b-button>
        </template>  
      </b-table>
      
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
      alunos: [],
      fields:[
        'nome', 'dataVencimento','email', 'endereco', 'telefone', 'cpf', {key:'actions', label:'Apagar'}
      ]
    }
  },
  methods:{
    editarAluno(a){
      this.$store.commit('setUserEdit', a)
    },
    apagar(data){
      let app = this;
      axios.delete('usuario/delete/'+data.item.id+'/').then(res => {
        app.getUsuarios()
      })
    },
    getUsuarios(){
      let app = this;
      axios.get('usuario/getAll').then(function(res){
        app.alunos = res.data;
      })//.catch(function(error){
      //   console.log(error)
      // })
    }
  },
  mounted(){
    this.getUsuarios()
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
