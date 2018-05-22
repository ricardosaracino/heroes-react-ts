import apiFetch from './FetchService';

import store from './store';

import {loginUser, logoutUser} from './actions';

import {AuthUser} from './models/AuthUser';

export class AuthService {

    private endpoint = 'http://localhost:8030/authenticate';

    public login(username: string, password: string): Promise<AuthUser> {

        return apiFetch(this.endpoint, {
            method: 'POST',
            body: JSON.stringify({username, password})

        }).then(authUser => {

            localStorage.setItem('authUser', JSON.stringify(authUser));

            store.dispatch(loginUser(authUser));

            return authUser;
        });
    }

    public checkLogin()
    {
        const authUserJson = localStorage.getItem('authUser');

        if (authUserJson) {

            // todo could refresh auth user
            store.dispatch(loginUser(JSON.parse(authUserJson)));
        }
    }

    public logout() : Promise<any> {

        return apiFetch(this.endpoint, {
            method: 'DELETE',
        }).then(response => {

            localStorage.removeItem('authUser');

            store.dispatch(logoutUser());

        });
    }
}