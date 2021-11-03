import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import { Role } from '@/helpers'

Vue.use(VueRouter)

const routes = [
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
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ `../views/Login.vue`)
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('should this be beforeEach or beforeResolve?')
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  // TODO: vuex-persistedstate
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (authorize) {
    // TODO: login popup vs redirect to login
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      // return next({ path: '/login', query: { returnUrl: to.path } });
      return next({ path: '/login', query: { redirect: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: '/' });
    }
  }
  // TODO: use case: user tries to view admin page, gets redirected to login page with admin as redirect after success, logs in as user, gets redirected to home page with router error
  // error is 'expected'
  // https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a

  next();
})

export default router
