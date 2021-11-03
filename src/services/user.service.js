import { authHeader, handleResponse } from '@/helpers'
import axios from 'axios'

export const userService = {
    getAll
};

function getAll() {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // return fetch(`${process.env.VUE_APP_API_URL}/users`, requestOptions).then(handleResponse);
    return axios.get(`${process.env.VUE_APP_API_URL}/users`, {
        headers: authHeader()
    }).then(handleResponse)
}