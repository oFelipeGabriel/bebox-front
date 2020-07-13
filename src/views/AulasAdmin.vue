<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="pt-3 px-3 h600">
    <div class="card">
      <b-table responsive striped hover :items="aulas" :fields="fields">
        <template v-slot:cell(alunos)="data">
          <ul>
            <li v-for="(a, index) in data.item.alunos" v-bind:key="index" :class="{'par': index%2==0}">{{a.nome}}</li>
          </ul>
        </template>
        <template v-slot:cell(apagar)="data">
          <a class="btn btn-danger" @click="removeAula(data.item)">Apagar</a>
        </template>

      </b-table>
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
      aulas: [],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      fields:[
        {key:'dia', label: 'Dia'},
        {key: 'hora', label: 'Hora'},
        {key: 'quantidade', label:'Quantidade'},
        {key: 'checked', label: 'Inscritos'},
        {key:'alunos', label: 'Alunos'},
        {key: 'apagar', label: 'Apagar'}
      ]
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
      let app = this;
      axios.post('aula/removeAula/'+aula.id).then(res => {
        app.aulas = res.data;
      })
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
.btn-danger{
  color: #dedede;
}
.par{
  background-color: #dedede;
}
</style>
