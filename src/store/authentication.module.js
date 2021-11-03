import { authenticationService } from '@/services';

// TODO: move all items stored in localStorage to vuex store once vuex-persistence implemented
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };
// TODO: use decoded user/role as sources of truth (not the returned user object)

// export const authentication = {
export default {
    namespaced: true,
    state: initialState,
    actions: {
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
            state.user = null;
        },
        LOGOUT(state) {
            state.status = {};
            state.user = null;
        }
    }
}
