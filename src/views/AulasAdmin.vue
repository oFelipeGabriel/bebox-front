<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    <div class="pt-3 px-3">
    <div class="card">
      <b-table responsive striped hover :items="aulas" :fields="fields">
        <template v-slot:cell(alunos)="data">
          <ul>
            <li v-for="a in data.item.alunos" v-bind:key="a">{{a.nome}}</li>
          </ul>
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
        {key:'alunos', label: 'Alunos'}
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

<style lang="scss">
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

</style>
