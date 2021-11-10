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
  modalVisible: false,
  modalComponent: '',
  // modules: {
  //   ...authentication,
  //   ...alert,
  //   ...users,
  // }
}

export const getDefaultStore = () => {
  return {
    // export default new Vuex.Store(getDefaultStore({
    // plugins: [createPersistedState({ paths: ['userPrefs', 'token', 'refreshToken'] })],
    state: { ...initialState },
    mutations: {
      RESET_STATE: (state) => {
        Object.keys(initialState).forEach(key => {
          console.log(`resetting state: ${key}: ${JSON.stringify(state[key])}`)
          console.log(`to: ${JSON.stringify(initialState[key])}`)
          // if (initialState[key] !== null) {
          Object.assign(state[key], initialState[key])
          // } else {
          //   state[key] = null;
          // }
        })
      },
      SHOW_MODAL: (state, componentName) => {
        state.modalVisible = true;
        state.modalComponent = componentName;
      },
      HIDE_MODAL: (state) => {
        console.log(`store.mutations.HIDE_MODAL`)
        state.modalVisible = false;
        // state.modalComponent = null;
      },
    },
    actions: {
      resetState({ commit }) {
        commit('RESET_STATE')
      },
    },
    getters: {},
    modules: {
      authentication,
      alert,
      users
    }
  }
}
export default new Vuex.Store(getDefaultStore())
