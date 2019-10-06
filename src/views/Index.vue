<template>
  <div class="">
    Ola {{username}}
    <ul>
      <li v-for="aula in aulas">
        <span>{{aula.dia}}</span>
        <span>{{aula.hora}}</span>
        <span>{{aula.quantidade}}</span>
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
