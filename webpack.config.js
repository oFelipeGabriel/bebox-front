const SWPrecache = require('sw-precache-webpack-plugin')

new SWPrecache({
  cacheId: 'dc-covers',
  filepath: 'service-worker.js',
  staticFileGlobs: [
    'public/index.html',
    'public/img/icons/manifest.json',
    'dist/*.js',
    'dist/*.css'
  ],
  stripPrefix: '/'
})

module.exports = {
    module: {
      rules: [
        // ... other rules omitted
  
        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    // plugin omitted
  }