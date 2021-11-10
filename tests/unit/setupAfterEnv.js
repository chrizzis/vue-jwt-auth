// Before calling new Vuex.Store in your code, you'll need to `.use` it on the
// global (or local) Vue instance. In frameworks like Jest, the `setupFilesAfterEnv`
// property is a good place to do this.
// https://jestjs.io/docs/configuration#setupfilesafterenv-array
import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)