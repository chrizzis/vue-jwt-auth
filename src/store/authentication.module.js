import { authenticationService } from '@/services';

// TODO: move all items stored in localStorage to vuex store once vuex-persistence implemented
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: {} };
// TODO: use decoded user/role as sources of truth (not the returned user object)

// export const authentication = {
export default {
    namespaced: true,
    state: initialState,
    // TODO: once actions built up, move to api file
    actions: {
        // async login({ dispatch, commit }, { username, password }) {
        login({ dispatch, commit }, { username, password }) {
            commit('LOGIN_REQUEST', { username });
            console.log(`auth.module.login`)

            return new Promise((resolve, reject) => {
                authenticationService.login(username, password)
                    .then(
                        user => {
                            console.log(`auth.module.login.userService.login.then.user`)
                            commit('LOGIN_SUCCESS', user);
                            resolve(user)
                        },
                        error => {
                            console.log(`auth.module.login.userService.login.then.error`)
                            commit('LOGIN_FAILURE', error);
                            dispatch('alert/error', error, { root: true });
                            reject(error)
                        }
                    );
            })
            // try {
            //     const user = await authenticationService.login(username, password)
            //     console.log(`auth.module.login.userService.login.then.user`)
            //     commit('LOGIN_SUCCESS', user);
            //     // resolve(user)
            //     return user
            // } catch (error) {
            //     console.log(`auth.module.login.userService.login.then.error`)
            //     commit('LOGIN_FAILURE', error);
            //     dispatch('alert/error', error, { root: true });
            //     // TODO: vuex action error handoer?
            //     return error
            // }
        },
        logout({ dispatch, commit }) {
            authenticationService.logout();
            commit('LOGOUT');
            // TODO: is this where i call
            dispatch('resetState', null, { root: true });
        }
    },
    mutations: {
        LOGIN_REQUEST(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        LOGIN_SUCCESS(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        LOGIN_FAILURE(state) {
            state.status = {};
            // state.user = null;
            state.user = {};
        },
        LOGOUT(state) {
            state.status = {};
            // state.user = null;
            state.user = {};
        }
    },
    getters: {
        // TODO: seems to be a race condition on logout
        isAuthenticated: (state) => {
            console.log(`auth.module.getters.isAuthenticated? ${state.status?.loggedIn ? true : false}`)
            // return state.status?.loggedIn ? true : false
            return state.status?.loggedIn
        }
    }
}
