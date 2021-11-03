import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication.module.js'
import users from './users.module.js'
import alert from './alert.module.js'

Vue.use(Vuex)

const initialState = {
  authentication: { ...authentication.state },
  alert: { ...alert.state },
  users: { ...users.state },
}

export default new Vuex.Store({
  // plugins: [createPersistedState({ paths: ['userPrefs', 'token', 'refreshToken'] })],
  state: { ...initialState },
  mutations: {
    RESET_STATE: (state) => {
      Object.keys(initialState).forEach(key => {
        console.log(`resetting state: ${key}: ${JSON.stringify(state[key])}`)
        console.log(`to: ${JSON.stringify(initialState[key])}`)
        Object.assign(state[key], initialState[key])
      })
    }
  },
  actions: {
    resetState({ commit }) {
      commit('RESET_STATE')
    }
  },
  modules: {
    authentication,
    alert,
    users
  }
})
