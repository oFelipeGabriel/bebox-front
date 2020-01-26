<template>
  <div class="">
    <Header></Header>
    <ul class="pl-4">
      <li v-for="aula in aulas" class="li-aulas">
        <div class="card mr-4 p-3 li-aulas-div ">
          <div class="col-md-4 d-flex flex-row px-0 mb-1">
            <div class="border rounded col-sm-5 col-md-5 pt-2 data-card">
              <h1 class="mb-0">{{getDia(aula.dia)}}</h1>
              <h3 class="mb-1">{{getMes(aula.dia)}}</h3>
            </div>
            
            <div class="col-md col-sm-6 px-0">
              <h2 class="mt-1 font-3 px-3">{{aula.hora}}Hrs</h2>
              <div class="col-md px-0  dados-aula text-right mb-0">
                <h4 class=" pr-2 mb-0">Total: {{aula.quantidade}}</h4>
                <h5 class="mb-1 pr-2">Ja inscritos: {{aula.alunos.length}}</h5>
              </div>
            </div>
            
          </div>
          <div class="row mt-1 mx-1 text-right  border rounded dados-aula px-3">
            
            <div class="col-md-4 p-0 border rounded text-center my-2 btn-fazer">
              <h2 v-if="!verificaAula(aula) && !verificaLimite(aula)" class="btn-limite px-2 py-3 m-0 rounded">Limite atingido</h2>
              <h3 v-else-if="!verificaAula(aula)" @click="fazerCheckin(aula)" class="btn-checkin p-3 m-0">CHECK-IN</h3>
              <h2 v-else @click="desfazerCheckin(aula)" class="btn-desfazer p-3 m-0">Desfazer</h2>
            </div>
          
         
         
          </div>
       
        </div>
        
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
      let app = this
      //aula.alunos.push(this.usuario.id)
      axios.post('aula/addAluno/'+aula.id+'/'+this.usuario.id+'/').then(res => {
        console.log(res)
        app.aulas = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    desfazerCheckin(aula){
      // let index = aula.alunos.indexOf(this.usuario.id);
      // aula.alunos.splice(index, 1);
      let app = this
      let link = 'aula/removeAluno/'+aula.id+'/'+this.usuario.id+'/'
      axios.post(link).then(res => {
        app.aulas = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    getDia(data){
      return data.split('/')[0]
    },
    getMes(data){
      let mes = parseInt(data.split('/')[1])
      return this.meses[mes-1]
    },
    verificaLimite(aula){
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
      for(let a in aula.alunos){
        if(aula.alunos[a].id==this.usuario.id){
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
      usuario:{
        get(){
          return this.$store.state.usuario
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

<style lang="scss">
.li-aulas-div{
  display: flex;
  flex-direction: column;
}
.data-card{
  color: #ccc;
  background-color: #252626 !important;
}
.dados-aula{
  background-color: $secondary;
}
.font-3{
  font-size: 9vw;
}
.btn-fazer{
  cursor: pointer;
}
.btn-desfazer{
  background-color: $positive;
  color: #ffffff;
  border-radius: 5px;
}
.btn-checkin{
  background-color: #fff;
}
.btn-limite{
  background-color: $negative;
  color: #fff
}
@media screen and (min-width: 900px) {
  .font-3 {
     font-size: 3rem;
  }
}
</style>


