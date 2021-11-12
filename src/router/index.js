import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import { Role } from '@/helpers'
import store from '@/store'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: { authorize: [] }
  },
  {
    path: '/moderator',
    name: 'Moderator',
    component: () => import(/* webpackChunkName: "moderator" */ '../views/Moderator.vue'),
    meta: { authorize: [Role.Admin, Role.Moderator] }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/login',
    name: 'Login',
    // TODO: this was causing import order warnings on e2e tests
    // component: () => import(/* webpackChunkName: "login-page" */ `../views/LoginPage.vue`)
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    // TODO: this was causing import order warnings on e2e tests
    // component: () => import(/* webpackChunkName: "register-page" */ '../views/RegisterPage.vue')
    component: RegisterPage
  },
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// TODO: temp
const noPopPaths = ['Login', 'Register']

router.beforeEach((to, from, next) => {
  console.log('should this be beforeEach or beforeResolve?')

  // TODO: temp to remove modal during route change (when modal already popped)
  store.commit('HIDE_MODAL')

  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  // TODO: vuex-persistedstate
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (authorize) {
    // if (!currentUser && noPopPaths.includes(from.name)) {
    if (!currentUser) {
      if (!noPopPaths.includes(from.name)) {
        // if !from.login|register, pop modal and stay on page
        store.commit('SHOW_MODAL', 'ModalLoginRegister')
        return next(from);
      } else {
        // if from.login|register, redirect to login, then try to redirect back on success
        return next({ path: '/login', query: { redirect: to.path } });
      }
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // TODO: pop modal asking for permissions if non-admin route
      // store.commit('SHOW_MODAL', 'ModalRequestAuth')
      if (authorize.includes(Role.Moderator)) {
        // TODO: this pops modal on login failure
        store.commit('SHOW_MODAL', 'ModalRequestAuth')
        return next(from);
      }
      // role not authorised so redirect to home page - even if unauthorized user trying to access admin page
      return next({ path: '/' });
    }
  }
  // TODO: use case: user tries to view admin page, gets redirected to login page with admin as redirect after success, logs in as user, gets redirected to home page with router error
  // error is 'expected'
  // https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a

  // next();
  return next();
})

export default router
