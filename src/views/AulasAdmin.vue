<template>
  <div>
    <HeaderAdmin></HeaderAdmin>
    
    <div class="table border d-flex table col-md-12">
      <div class="col-md-4 font-weight-bolder text-center">
        Dia
      </div>
      <div class="col-md-4 font-weight-bolder text-center">
        Hora
      </div>
      <div class="col-md-4 font-weight-bolder text-center">
        Quantidade máxima
      </div>
    </div>
    <div  v-for="aula in aulas">
      <div class="tabela">        
        <div>{{aula.dia}}</div>
        <div>{{setHour(aula.hora)}} Hrs</div>
        <div>{{aula.quantidade}}</div>
      </div>
      <ul>
        <li v-for="aluno in aula.alunos">
          <div>{{aluno.nome}}</div>
        </li>
      </ul>

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
      aulas: [],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      
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
    let admin = this.$store.getters.isAdmin
    axios.get('aula/getAll').then(function(res){
      console.log(res)
      app.aulas = res.data;
    }).catch(function(error){
      console.log(error)
    })
  },
  computed:{
    isAdmin:{
      get(){
        return store.getters.isAdmin
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
