import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from './router';

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'my-sec-app',
  storage: localStorage
})

export default new Vuex.Store({
  plugins: [
    vuexPersist.plugin
  ],
  state: {
    usuario: null,
    token: null,
    userid: null,
    temToken: false,
    admin: false,
    nome: null,
    usuarioEditar: null,
  },
  mutations: {
    setUsuario (state, usuario) {
      state.usuario = usuario
    },
    setUserid(state, id){
      state.userid = id;
    },
    setToken (state, token)  {
      state.token = token
      state.temToken = true
    },
    logout (state) {
      state.token = null
      state.usuario = null
      state.temToken = false
      router.push('/login');
    },
    setAdmin(state, admin){      
      state.admin = admin;
    },
    setUserEdit(state, user){
      state.usuarioEditar = user
      router.push('/alunos/novo')
    },
    setUsuarioEditarToNull (state){
      state.usuarioEditar = null
    }
  },
  actions: {
    temAcesso:()=>{
      localStorage.getItem('temToken')
    },
    isAdmin:()=>{
      localStorage.getItem('admin')
    }
  },
  getters:{
    isAdmin: state =>{
      if(state.admin){
        return state.admin
      }else{
        router.push('/login');
      }
    },
    getNome: state => {      
      return state.usuario.nome
    },
    getUsuarioEditar: state => {
      return state.usuarioEditar
    }
  }
})
