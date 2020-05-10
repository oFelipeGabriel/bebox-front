module.exports = {
  devServer:{
    proxy: 'http://localhost:8000/'
  }
}
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/css/app.scss";`
      }
    }
  },
  pwa:{
    name: 'Bebox',
    themeColor: '#252626',
    manifestPath: 'img/icons'
  }
};
// 
// module.exports = {
//   // ...
//   resolve: {
//     alias: {
//       // If using the runtime only build
//       vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
//       // Or if using full build of Vue (runtime + compiler)
//       // vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
//     }
//   }
// }
