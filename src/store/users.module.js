import { userService } from '@/services';

// export const users = {
export default {
    namespaced: true,
    state: {
        all: {}
    },
    // TODO: once actions built up, move to api file
    actions: {
        getAll({ commit }) {
            commit('GET_ALL_REQUEST');

            userService.getAll()
                .then(
                    users => {
                        console.log(`users.module.actions.getAll.userService.getAll.users: ${JSON.stringify(users, null, 2)}`)
                        commit('GET_ALL_SUCCESS', users)
                    },
                    error => commit('GET_ALL_FAILURE', error)
                );
        }
    },
    mutations: {
        GET_ALL_REQUEST(state) {
            state.all = { loading: true };
        },
        GET_ALL_SUCCESS(state, users) {
            state.all = { items: users };
        },
        GET_ALL_FAILURE(state, error) {
            state.all = { error };
        }
    }
}
