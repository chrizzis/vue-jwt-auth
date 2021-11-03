export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('token'));
    console.log(`authHeader user: ${user}, token: ${token}`)

    // TODO: just token after decode for user/role implemented
    if (user && token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}