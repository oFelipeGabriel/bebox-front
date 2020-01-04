<template>
      <div class="container-login100">
          <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
              <div class="login100-form validate-form">
                  <img src="../assets/img/logo.png" alt="Bebox" class="logo">

                  <div class="wrap-input100 validate-input">
                      <input :class="'input100 '+inputErro" type="text" v-model="cpf" placeholder="CPF">
                      <span class="focus-input100-1"></span>
                      <span class="focus-input100-2"></span>
                  </div>

                  <div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
                      <input :class="'input100 '+inputErro" type="password" v-model="senha" placeholder="Senha">
                      <span class="focus-input100-1"></span>
                      <span class="focus-input100-2"></span>
                  </div>
                  <span v-show="invalid" class="invalid-login">Login inválido</span>
                  <div class="container-login100-form-btn m-t-20">
                      <button class="login100-form-btn" @click="logar">
                          ENTRAR <b-spinner v-show="logando" class="ml-3" label="Spinning"></b-spinner>
                      </button>
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
      is_admin: false,
      invalid: false,
      inputErro: '',
      logando: false
    }
  },
  methods:{
    ...mapMutations([
     'setUsuario',
     'setToken',
     'setUserid',
     'setAdmin'
   ]),
    validaAdmin(id){
      let app = this;
      
    },
    logar(){
      let app = this;
      this.logando = true
      axios.post('logando/', {'username':this.cpf, 'password':this.senha}).then(function(res){
        app.setToken(res.headers.token)
        app.setUsuario(res.data)
        app.setAdmin(res.data.is_admin)
        if(res.data.is_admin){
            app.$router.push('/admin/aulas')
        }else{
            app.$router.push('/aulas')
        }
      }).catch(err => {
        let status = err.response.status
        if(status == 400 || status == 401){
            app.inputErro = 'input-erro'
          app.invalid = true;
          app.logando = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @font-face {
      font-family: OpenSans-Regular;
      src: url('../assets/OpenSans/OpenSans-Regular.otf');
      font-weight: normal;
  }

  body,
  html {
      height: 100%;
      font-family: OpenSans-Regular, sans-serif;
  }

  .logo {
      width: 100%
  }

  a {
      font-family: OpenSans-Regular;
      font-size: 14px;
      line-height: 1.7;
      color: #666666;
      margin: 0px;
      transition: all 0.4s;
      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
  }

  a:focus {
      outline: none !important;
  }

  a:hover {
      text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
      margin: 0px;
  }

  p {
      font-family: OpenSans-Regular;
      font-size: 14px;
      line-height: 1.7;
      color: #666666;
      margin: 0px;
  }

  ul,
  li {
      margin: 0px;
      list-style-type: none;
  }

  input {
      outline: none;
      border: none;
  }

  textarea {
      outline: none;
      border: none;
  }

  textarea:focus,
  input:focus {
      border-color: transparent !important;
  }

  input::-webkit-input-placeholder {
      color: #666666;
  }

  input:-moz-placeholder {
      color: #666666;
  }

  input::-moz-placeholder {
      color: #666666;
  }

  input:-ms-input-placeholder {
      color: #666666;
  }

  textarea::-webkit-input-placeholder {
      color: #666666;
  }

  textarea:-moz-placeholder {
      color: #666666;
  }

  textarea::-moz-placeholder {
      color: #666666;
  }

  textarea:-ms-input-placeholder {
      color: #666666;
  }
.input-erro{
    border: 1px solid $accent;
}
  button {
      outline: none !important;
      border: none;
      background: transparent;
  }

  button:hover {
      cursor: pointer;
  }

  iframe {
      border: none !important;
  }

  .txt1 {
      font-family: OpenSans-Regular;
      font-size: 15px;
      line-height: 1.4;
      color: #999999;
  }

  .txt2 {
      font-family: OpenSans-Regular;
      font-size: 15px;
      line-height: 1.4;
      color: #4272d7;
  }

  .hov1:hover {
      text-decoration: underline;
  }

  .limiter {
      width: 100%;
      margin: 0 auto;
  }

  .container-login100 {
      width: 100%;
      min-height: 100vh;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: $primary;
      position: absolute;
      top: 0;
      left: 0;
  }

  .wrap-login100 {
      width: 500px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
      -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
      -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  }

  .login100-form {
      width: 100%;
  }

  .login100-form-title {
      display: block;
      font-family: OpenSans-Regular;
      font-size: 30px;
      color: #555555;
      line-height: 1.2;
      text-align: center;
  }
.invalid-login{
  color: $negative;
  font-size: 1.5rem;
  padding: 10px 0
}
  .wrap-input100 {
      width: 100%;
      position: relative;
      background-color: #fff;
      border: 1px solid #e6e6e6;
  }

  .wrap-input100.rs1 {
      border-top: none;
  }

  .input100 {
      display: block;
      width: 100%;
      background: transparent;
      font-family: OpenSans-Regular;
      font-size: 15px;
      color: #666666;
      line-height: 1.2;
  }

  input.input100 {
      height: 68px;
      padding: 0 25px 0 25px;
  }

  .focus-input100-1,
  .focus-input100-2 {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
  }

  .focus-input100-1::before,
  .focus-input100-2::before {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 1px;
      background-color: #4272d7;
  }

  .focus-input100-1::before {
      top: -1px;
      left: 0;
  }

  .focus-input100-2::before {
      bottom: -1px;
      right: 0;
  }

  .focus-input100-1::after,
  .focus-input100-2::after {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: 0;
      background-color: #4272d7;
  }

  .focus-input100-1::after {
      top: 0;
      right: -1px;
  }

  .focus-input100-2::after {
      bottom: 0;
      left: -1px;
  }

  .input100:focus + .focus-input100-1::before {
      -webkit-animation: full-w 0.2s linear 0s;
      animation: full-w 0.2s linear 0s;
      animation-fill-mode: both;
      -webkit-animation-fill-mode: both;
  }

  .input100:focus + .focus-input100-1::after {
      -webkit-animation: full-h 0.1s linear 0.2s;
      animation: full-h 0.1s linear 0.2s;
      animation-fill-mode: both;
      -webkit-animation-fill-mode: both;
  }

  .input100:focus + .focus-input100-1 + .focus-input100-2::before {
      -webkit-animation: full-w 0.2s linear 0.3s;
      animation: full-w 0.2s linear 0.3s;
      animation-fill-mode: both;
      -webkit-animation-fill-mode: both;
  }

  .input100:focus + .focus-input100-1 + .focus-input100-2::after {
      -webkit-animation: full-h 0.1s linear 0.5s;
      animation: full-h 0.1s linear 0.5s;
      animation-fill-mode: both;
      -webkit-animation-fill-mode: both;
  }

  @keyframes full-w {
      to {
          width: calc(100% + 1px);
      }
  }

  @keyframes full-h {
      to {
          height: calc(100% + 1px);
      }
  }

  .container-login100-form-btn {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
  }

  .login100-form-btn {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 60px;
      background-color: $secondary;
      font-family: OpenSans-Regular;
      font-size: 14px;
      color: $primary;
      line-height: 1.2;
      text-transform: uppercase;
      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
      transition: all 0.4s;
  }

  .login100-form-btn:hover {
      background-color: $primary;
      color: $secondary;
      border: 1px solid $secondary;
  }

  .validate-input {
      position: relative;
  }

  .alert-validate::before {
      content: attr(data-validate);
      position: absolute;
      max-width: 70%;
      background-color: #fff;
      border: 1px solid #c80000;
      border-radius: 2px;
      padding: 4px 25px 4px 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 12px;
      pointer-events: none;
      font-family: OpenSans-Regular;
      color: #c80000;
      font-size: 13px;
      line-height: 1.4;
      text-align: left;
      visibility: hidden;
      opacity: 0;
      -webkit-transition: opacity 0.4s;
      -o-transition: opacity 0.4s;
      -moz-transition: opacity 0.4s;
      transition: opacity 0.4s;
  }

  .alert-validate::after {
      content: "\f12a";
      font-family: FontAwesome;
      display: block;
      position: absolute;
      color: #c80000;
      font-size: 16px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 18px;
  }

  .alert-validate:hover:before {
      visibility: visible;
      opacity: 1;
  }

  @media (max-width: 992px) {
      .alert-validate::before {
          visibility: visible;
          opacity: 1;
      }
  }

</style>
