module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/catalog-ui-gh-pages-prototype/'
    : '/'
}
