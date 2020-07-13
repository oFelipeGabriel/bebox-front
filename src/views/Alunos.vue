<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="card col p-2 mb-2">
      <div class="form-group">
        <label for="input-filter" class="text-left w-100 font-weight-bold">Buscar: </label>
        <input type="text" v-model="filter" id="input-filter" placeholder="Digite o nome" class="form-control">
      </div>
    </div>
    <div class="card col-md-12">
      <b-table responsive striped hover :items="alunosFiltrados" :fields="fields" @row-clicked="editarAluno">

        <template v-slot:cell(pag)="data">
          <b-button class="btn btn-positive" @click="verPagamento(data)"><i class="fas fa-dollar-sign"></i></b-button>
        </template>
        <template v-slot:cell(actions)="data">
          <b-button v-if="data.item.id == user.id" disabled class="btn btn-danger" ><i class="fas fa-times"></i></b-button>
          <b-button v-else class="btn btn-danger" @click="apagar(data)"><i class="fas fa-times"></i></b-button>
        </template>

      </b-table>
    </div>
    <b-modal id="modal-1" title="Pagamentos" v-model="modalPagamento">
      <h3 v-if="usuarioSelec">{{usuarioSelec.nome}}</h3>
      <div class="form-group">
        <label>Filtrar forma de pagamento:</label>
        <b-form-select v-if="!novoPagamento"
          :options="optItemsPagamentos"
          v-model="filtroForma"
          @change="filtraForma"></b-form-select>
      </div>

      <b-table v-if="!novoPagamento" :items="pagamentos"></b-table>
      <div v-else>
        <div class="form-group">
          <label>Data</label>
          <b-form-input type="date" v-model="pagamento.data"></b-form-input>
        </div >
        <div class="form-group">
          <label>Valor</label>
          <b-form-input type="number" v-model="pagamento.valor"></b-form-input>
        </div>
        <div class="form-group">
          <label>Forma de pagamento</label>
          <b-form-select v-model="pagamento.forma" :options="optItemsPagamentos"></b-form-select>
        </div>

      </div>
      <template v-slot:modal-footer>
        <div class="w-100" v-if="!novoPagamento">
          <b-button
            variant="positive"
            size="sm"
            class="float-right font-w"
            @click="novoPagamento=!novoPagamento"
          >
            Novo
          </b-button>
        </div>
        <div v-else>

          <b-button
            variant="positive"
            size="sm"
            class="float-right font-w ml-3"
            @click="inserePagamento"
          >
            Confirma
          </b-button>
          <b-button
            variant="secondary"
            size="sm"
            class="float-right font-w"
            @click="novoPagamento=false"
          >
            Voltar
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
      alunosFiltrados: [],
      filter: "",
      fields:[
        {key: 'nome', label: 'Nome',stickyColumn: true, class: 'pointer', sortable: true},
        {key: 'dataVencimento', label: 'Data de vencimento', sortable: true},
        {key: 'email',label: 'E-mail', sortable: true},
        {key: 'endereco', label: 'Endereço', sortable: true},
        'telefone', 'cpf',
        {key:'pag', label:'Pagamento'},
        {key:'actions', label:'Apagar'}
      ],
      modalPagamento: false,
      pagamentos: [],
      novoPagamento: false,
      usuarioSelec: null,
      optItemsPagamentos: [
        {text: 'Selecione', value: '', disabled: true, selected: true},
        {text: 'Dinheiro', value: 'Dinheiro'},
        {text: 'Debito', value: 'Debito'},
        {text: 'Credito', value: 'Credito'},
      ],
      pagamento: {
        valor: '',
        data: '',
        forma: ''
      },
      filtroForma: ''
    }
  },
  methods:{
    editarAluno(a){
      this.$store.commit('setUserEdit', a)
    },
    apagar(data){
      let app = this;
      axios.delete('usuario/delete/'+data.item.id+'/').then(() => {
        app.getUsuarios()
      })
    },
    filtraForma(val){
      let app = this
      axios.get('pagamento/'+val+'/'+this.usuarioSelec.id).then(res => {
        app.pagamentos = res.data
      })
    },
    getUsuarios(){
      let app = this;
      axios.get('usuario/getAll').then(function(res){
        app.alunos = res.data;
        app.alunosFiltrados = res.data;
      })//.catch(function(error){
      //   console.log(error)
      // })
    },
    verPagamento(data){
      this.novoPagamento = false
      let app = this
      this.usuarioSelec = data.item
      app.modalPagamento = true
      axios.get('pagamento/get/'+data.item.id).then(function(res){

        app.pagamentos = res.data
      })//.catch(function(error){
      //   console.log(error)
      // })
    },
    inserePagamento(){
      let app = this
      let d = new Date(this.pagamento.data).toISOString();
      this.pagamento.data = Date.parse(d)
      axios.post('pagamento/novo/'+this.usuarioSelec.id, this.pagamento).then( () => {
        app.novoPagamento = false
      })//.catch( err => {
      //   console.log(err)
      // })
    }
  },
  mounted(){
    this.getUsuarios()
  },
  watch:{
    filter(){
      this.alunosFiltrados = this.alunos.filter(p => {
        return p.nome.toLowerCase().includes(this.filter.toLowerCase());
      })
    },
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
.pointer{
  cursor:pointer;
}
</style>
