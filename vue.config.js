// TODO: if deployed to 
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // if this is served on gh-pages, public path = repo name, else root
  publicPath: process.env.NODE_ENV === 'production' && !process.env.BUILD_TO_SERVER
    // ? '/<REPO>/' 
    ? '/vue-jwt-auth/'
    : '/'
}
