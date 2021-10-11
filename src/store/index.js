import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication.module.js'
import users from './users.module.js'
import alert from './alert.module.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    alert,
    users
  }
})
