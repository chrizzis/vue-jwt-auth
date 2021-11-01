import { handleResponse } from '@/helpers';

export const authenticationService = {
    login,
    logout,
    // currentUser?
};
function login(username, password) {
    console.log(`User.login, name: ${username}, password: ${password}`)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    // return fetch(`${process.env.VUE_APP_API_URL}/users/authenticate`, requestOptions)
    return fetch(`${process.env.VUE_APP_API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // eslint-disable-next-line
            const { user, token, refreshToken } = data
            console.log(`User.login.handleResponse success, data: ${data}`)
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
