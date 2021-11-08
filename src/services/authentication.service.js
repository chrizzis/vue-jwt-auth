import { handleResponse } from '@/helpers';
// eslint-disable-next-line
import axios from 'axios'

export const authenticationService = {
    login,
    logout,
    // currentUser?
};

// eslint-disable-next-line
// function fetchLogin(username, password) {
function login(username, password) {
    console.log(`User.login, name: ${username}, password: ${password}`)
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };
    // return fetch(`${process.env.VUE_APP_API_URL}/users/authenticate`, requestOptions)
    // return fetch(`${process.env.VUE_APP_API_URL}/auth/login`, requestOptions)
    return axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {
        username,
        password
    })
        .then(handleResponse)
        .then(data => {
            // TODO: DEF: ths standard: dont use user for auth - use token's user. will have to decode with public key
            // https://stackoverflow.com/questions/51503024/how-does-server-return-jwt-token-to-the-client ->
            // https://self-issued.info/docs/draft-ietf-oauth-v2-bearer.html#ExAccTokResp
            // const oauthGuideline = {
            //     "access_token":"your.jwt.here",
            //     "token_type":"JWT",
            //     "expires_in":3600, // why this? expiration is in the jwt
            //     "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
            // }

            // eslint-disable-next-line
            const { user, token, refreshToken } = data
            console.log(`User.login.handleResponse success, data: ${JSON.stringify(data)}`)
            // login successful if there's a jwt token in the response
            if (token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));
            }
            return user;
        })
    // .then(user => {
    //     console.log(`User.login.handleResponse success, user: ${user}`)
    //     // login successful if there's a jwt token in the response
    //     if (user.token) {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }

    //     return user;
    // })
}

// TODO: this should be moved to an auth service that encapsulates current user info
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}
