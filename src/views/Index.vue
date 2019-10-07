<template>
  <div class="">
    Ola {{username}}
    <ul>
      <li v-for="aula in aulas">
        <h2>{{aula.dia}}</h2>
        <h2>{{aula.hora}}</h2>
        <h2>{{aula.quantidade}}</h2>
        <h2 v-if="!aula.alunos.includes(id)" @click="fazerCheckin(aula)">Check-in</h2>
        <h2 v-else @click="desfazerCheckin(aula)">Desfazer Check-in</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';


export default{
  name: 'Index',
  data(){
    return{
      aulas: []
    }
  },
  methods:{
    fazerCheckin(aula){
      aula.alunos.push(this.id)
      axios.put('list_aulas/'+aula.id+'/', aula).then(res => {
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
  },
  mounted(){
    let app = this;
    axios.get('list_aulas/').then(function(res){
      console.log(res)
      app.aulas = res.data;
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
