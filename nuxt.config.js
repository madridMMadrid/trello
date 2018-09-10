module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'trello',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet prefetch', href: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.4/foundation.min.css' },
      { rel: 'stylesheet prefetch', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet prefetch', href: 'https://fonts.googleapis.com/css?family=Nunito' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
   plugins: ['~plugins/element-ui','~plugins/vue-scroll'],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}

