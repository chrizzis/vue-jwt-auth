import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

// setup fake backend
// import { configureFakeBackend } from '@/proto';
// configureFakeBackend();

// TODO: login with popup and redirect
// https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login/#Require-Users-to-Sign-in-to-View-Events

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
