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
    manifestOptions: {
      icons: [
        {
          src: "./public/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./public/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "./public/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "./public/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "./public/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "./img/icons/msapplication-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "./img/icons/mstile-150x150.png",
          sizes: "150x150",
          type: "image/png",
        },
      ],
    }
  }
};

module.exports = {
  // ...
  resolve: {
    alias: {
      // If using the runtime only build
      vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
      // Or if using full build of Vue (runtime + compiler)
      // vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
