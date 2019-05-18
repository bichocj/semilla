const pkg = require('./package')


module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#f28b8b', height: '5px'},
  loadingIndicator: {name: 'circle'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/    
    ['bootstrap-vue/nuxt', {css: false}],
    '@nuxtjs/apollo'
  ],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    postcss: [
      require('postcss-preset-env')({
        stage: 0,
        preserve: false,
        importFrom: [
          {
            // customProperties: require('./src/variables/variables')({ theme: 'green' }),
            // customMedia: require('./src/variables/custom-media')
          }
        ],
        features: {
          'color-mod-function': {
            unresolved: 'ignore'
          },
          'focus-within-pseudo-class': {
            preserve: true
          }
        }
      })
    ]
  },

  generate: {
    dir: '../backend/client'
  },

  babel: {
    presets: [
      'es2015',
      'stage-0',
    ],
    plugins: [
      'transform-runtime'
    ]
  },
}
