import { authHeader, handleResponse } from '@/helpers'

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.VUE_APP_API_URL}/users`, requestOptions).then(handleResponse);
}