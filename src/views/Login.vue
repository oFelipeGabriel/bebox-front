<template>
  <div class="">
        <div class="limiter">
      		<div class="container-login100">
      			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
              <router-link to="/aulas">Go to Foo</router-link>
      				<form class="login100-form validate-form" @prevent.default="" enctype=""method="post">
      					<span class="login100-form-title p-b-33">
      						Acesse o sistema
      					</span>

      					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
      						<span class="focus-input100-1"></span>
      						<span class="focus-input100-2"></span>
                  <input type="text" v-model="cpf">
      					</div>

      					<div class="wrap-input100 rs1 validate-input">
      						<span class="focus-input100-1"></span>
      						<span class="focus-input100-2"></span>
                  <input type="password" v-model="senha">
      					</div>

      					<div class="container-login100-form-btn m-t-20">
      						<input type="button" class="login100-form-btn" value="Entrar" @click="logar">

      					</div>
      				</form>
      			</div>
      		</div>
      	</div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default{
  name: 'Login',
  data(){
    return{
      cpf: '',
      senha: '',
    }
  },
  methods:{
    ...mapMutations([
     'setUsuario',
     'setToken',
     'setUserid'
   ]),
    logar(){
      let app = this;
      axios.post('login/', {'cpf':this.cpf, 'password':this.senha}).then(function(res){
        //console.log(res.data.token)
        app.setToken(res.data.token)
        app.setUsuario(res.data.username)

        app.setUserid(res.data.userid)
        //console.log(res.data)
        app.$router.push('/aulas')
      })
    }
  }
}
</script>
