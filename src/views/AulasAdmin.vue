<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="pt-3 px-3 h600">
    <div class="card">
      <b-table responsive striped hover :items="aulas" :fields="fields">
        <template v-slot:cell(alunos)="data">
          <ul class="lista-alunos">
            <li 
            v-for="(a, index) in data.item.alunos" 
            v-bind:key="index" 
            :class="{'par': index%2==0}">
              {{a.nome}}
            </li>
          </ul>
        </template>
        <template v-slot:cell(editar)="data">
          <a class="btn btn-info" @click="editaAula(data)">Editar</a>
        </template>
        <template v-slot:cell(apagar)="data">
          <a class="btn btn-danger" @click="removeAula(data.item)">Apagar</a>
        </template>

      </b-table>
    </div>
    </div>
    <ModalAula 
      :modelAula="modelAula" 
      :aula="aulaEditar" 
      @resetModal="modelAula=false"
      @addExperimental="addExperimental"
      @alunoRemovido="alunoRemovido"></ModalAula>
    
      <b-modal id="modal-apagar-aula" v-model="apagaAula" title="Apagar aula"
      cancel-title="Cancelar" ok-variant="danger" @ok="confirmaRemoveAula" @hidden="aulaApagar=null">
        <h3 class="my-4">Deseja realmente apagar a aula?</h3>
      </b-modal>
</div>
</template>

<script>
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin.vue';
import ModalAula from '../components/ModalAula.vue';

export default{
  name: 'Alunos',
  components: {
    HeaderAdmin,
    ModalAula
  },
  data(){
    return{
      aulas: [],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      fields:[
        {key:'dia', label: 'Dia'},
        {key: 'hora', stickyColumn: true, label: 'Hora'},
        {key: 'quantidade', label:'Quantidade'},
        {key: 'checked', label: 'Inscritos'},
        {key:'alunos', label: 'Alunos'},
        {key: 'editar', label: 'Editar'},
        {key: 'apagar', label: 'Apagar'}
      ],
      modelAula: false,
      aulaEditar: null,
      apagaAula: false,
      aulaApagar: null
    }
  },
  methods:{
    setDate(date){
      return new Date(date)
    },
    setHour(hora){
      let h = hora.split(':')[0]
      let m = hora.split(':')[1]
      return h+':'+m
    },
    removeAula(aula){
      this.apagaAula = true;
      this.aulaApagar = aula;
    },
    confirmaRemoveAula(){
      axios.post('aula/removeAula/'+this.aulaApagar.id).then(res => {
        this.aulaApagar = null;
        this.aulas = res.data;
      })
    },
    alunoRemovido(data){
      this.modelAula = false;
      this.aulas = data;
    },
    editaAula(data){
      this.modelAula = true;
      this.aulaEditar = data.item;
    },
    addExperimental(aulas){
      this.aulas = aulas
      // axios.post(`aula/addAlunoExperimental/${aula}`).then(res => {
        
      //   this.modelAula = false;
      // this.aulaEditar = null;
      // })
    }
  },
  mounted(){
    let app = this;
    axios.get('aula/getAllDone').then(function(res){
      app.aulas = res.data;
    })//.catch(function(error){
      //console.log(error)
    //})
  },
  computed:{
    isAdmin:{
      get(){
        return this.$store.getters.isAdmin
      }
    },
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

<style lang="scss" scoped>
.hamb{
  width: 100%;
  text-align: center;
}
.tabela{
  display: flex;
}
.tabela div{
  flex: 1
}
.h600{
  height: 600px;
}
.card{
  max-height: 106%;
    overflow-y: auto;
}
.btn-danger, .btn-info{
  color: #dedede;
}
.lista-alunos{
  padding: 2px;
}
.par{
  background-color: #dedede;
}
</style>
