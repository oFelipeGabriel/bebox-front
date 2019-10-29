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
  }
};
