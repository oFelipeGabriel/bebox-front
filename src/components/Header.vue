<template>
    <div class="header">
      <div class=" col-md-4 text-left pt-2">
        <span class="border rounded p-2 pointer" @click="showBar"><i class="fas fa-bars"></i></span>
      </div>
      <div class="col-md-4 text-center secondary-bg">
        <img src="../assets/img/logo.png" alt="Bebox - Desafiando você a viver melhor" class="logo-header">
      </div>
      <b-dropdown :text="'Olá, '+nome" id="drop-nome" block variant="primary-base" offset="55" class="col-md-4 pt-1 text-right">
        <b-dropdown-item @click="$store.commit('logout')">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
</template>

<script>
export default{
    name: 'Header',
    data(){
        return{
        }
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

<style lang="scss">
  .header{
    color: #ccc;
    background-color: $primary;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    text-align: right;
    padding: 10px 0;
  }
  ul{
    list-style: none;
    background-color: $secondary;
  }
  </style>