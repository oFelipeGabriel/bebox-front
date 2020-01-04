<template>
    <div class="header">
        <span>Olá {{nome}}</span>
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
    text-align: right;
    padding: 10px 0;
  }
  ul{
    list-style: none;
    background-color: $secondary;
  }
  </style>