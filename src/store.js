import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from './router';
import pack from '../package.json'


Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'bebox-app',
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
    packageVersion: (pack.version || '0.0.0'),
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
    },
    apagaToken (state) {
      state.token = null
      state.usuario = null
      state.temToken = false
    },
    setPackageVersion(state){
      state.packageVersion = pack.version;
    }
  },
  actions: {
    temAcesso:()=>{
      localStorage.getItem('temToken')
    },
    isAdmin:()=>{
      localStorage.getItem('admin')
    },
    apagaToken: (context)=>{
      context.commit('apagaToken')
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
    getUsuario: state => {
      return state.usuario
    },
    getNome: state => {      
      return state.usuario.nome
    },
    getUsuarioEditar: state => {
      return state.usuarioEditar
    },
    appVersion: (state) => {
      return state.packageVersion
    }
  }
})