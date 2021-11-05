import { authenticationService } from '@/services';

export function handleResponse(response) {
    const { status, data, statusText } = response
    if (!statusText) {
        if ([401, 403].includes(status)) {
            // TODO: maybe this is too heavy-handed: right now, if a logged in user requests all users (on user page), this will log user out
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authenticationService.logout();
            location.reload(true);
        }
        const error = (data && data.message) || statusText;
        return Promise.reject(error);
    }
    return data;
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if ([401, 403].indexOf(response.status) !== -1) {
    //             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //             authenticationService.logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
}