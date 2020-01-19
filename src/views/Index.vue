<template>
  <div class="">
    <Header></Header>
    <ul>
      <li v-for="aula in aulas">
        <h2>{{aula.dia}} - {{aula.hora}}Hrs</h2>
        <h2>Total: {{aula.quantidade}}</h2>
        <h2>Ja inscritos: {{aula.alunos.length}}</h2>
        <h2 v-if="!verificaAula(aula) && !verificaLimite(aula)">Limite atingido</h2>
        <h2 v-else-if="!verificaAula(aula)" @click="fazerCheckin(aula)">Fazer check-in</h2>
        <h2 v-else @click="desfazerCheckin(aula)">Desfazer Check-in</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import Header from '../components/Header.vue'

export default{
  name: 'Index',
  components: {
    Header
  },
  data(){
    return{
      aulas: [],
      id: null,
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    }
  },
  methods:{
    fazerCheckin(aula){
      aula.alunos.push(this.id)
      axios.post('aula/addAluno/'+aula.id+'/1/', aula).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    desfazerCheckin(aula){
      let index = aula.alunos.indexOf(this.id);
      aula.alunos.splice(index, 1);
      axios.put('list_aulas/'+aula.id+'/', aula).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    verificaLimite(aula){
        console.log('alunos', aula.alunos.length, 'aulas', aula.quantidade)
      if(aula.quantidade == aula.alunos.length){
        return false
      }else{
        return true
      }
    },
    setDate(date){
      return new Date(date)
    },
    setHour(hora){
      let h = hora.split(':')[0]
      let m = hora.split(':')[1]
      return h+':'+m
    },
    verificaAula(aula){
      for(let a in aula.alunos_id){
        if(aula.alunos_id[a]==this.id){
          return true
        }
      }
      return false
    }
  },
  mounted(){
    let app = this;
    axios.get('aula/getAll').then(function(res){
      app.aulas = res.data

    }).catch(function(error){
      console.log(error)
    })
    // if(this.$store.state.admin){
    //   this.$router.push('/admin/aulas')
    // }
    // if(this.$store.state.userid==null){
    //   this.$router.push('/login')
    // }else{
    //   this.id = this.$store.state.userid;
    // }
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
      admin:{
        get(){
          return this.$store.state.admin;
        }
      },
      nome:{
        get(){
          return this.$store.getters.getNome
        }
      }
    },
}
</script>


