<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="card col-md-12">
      <b-table responsive striped hover :items="alunos" :fields="fields" @row-clicked="editarAluno">
       
        <template v-slot:cell(pag)="data">
          <b-button class="btn btn-positive" @click="modalPagamento=true"><i class="fas fa-dollar-sign"></i></i></b-button>
        </template>
        <template v-slot:cell(actions)="data">
          <b-button v-if="data.item.id == user.id" disabled class="btn btn-danger" ><i class="fas fa-times"></i></b-button>
          <b-button v-else class="btn btn-danger" @click="apagar(data)"><i class="fas fa-times"></i></b-button>
        </template>  
        
      </b-table>      
    </div>
    <b-modal id="modal-1" title="Pagamento" v-model="modalPagamento">
      <div class="form-group"> 
        <label>Data</label>
        <b-form-input></b-form-input>
      </div >
      <div class="form-group">
        <label>Valor</label>
        <b-form-input></b-form-input>
      </div>
      <div class="form-group">
        <label>Forma de pagamento</label>
        <b-form-select></b-form-select>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="positive"
            size="sm"
            class="float-right font-w"
            @click="show=false"
          >
            Confirma
          </b-button>
        </div>
      </template>
    </b-modal>
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
        {key: 'nome', label: 'Nome',stickyColumn: true},
        {key: 'dataVencimento', label: 'Data de vencimento'},
        'email', 'endereco', 'telefone', 'cpf', 
        {key:'pag', label:'Pagamento'},
        {key:'actions', label:'Apagar'}
      ],
      modalPagamento: false
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
      user:{
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

<style lang="scss">
.btn-positive{
  background-color: $positive !important;
  border: 0 !important;
}
.font-w{
  color: white !important;
}
</style>