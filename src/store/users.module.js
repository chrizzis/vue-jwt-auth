import { userService } from '@/services';

// export const users = {
export default {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('GET_ALL_REQUEST');

            userService.getAll()
                .then(
                    users => commit('GET_ALL_SUCCESS', users),
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
