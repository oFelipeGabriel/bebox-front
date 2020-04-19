<template>
  <div id="app" class="p-2">
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'app',
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  background-color: $secondary;
}
body{
  background-color: $secondary !important;
}
</style>
