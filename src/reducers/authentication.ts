import {AUTH_ERROR, AUTH_USER, UNAUTH_USER,} from '../actions/types';

const INITIAL_STATE = {authUser: null, authenticated: false};

const authentication = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case AUTH_USER:
            return {...state, authUser: action.authUser, authenticated: true};
        case UNAUTH_USER:
            return {...state, authUser: null, authenticated: false};
        case AUTH_ERROR:
            return {...state, error: action.payload};
    }

    return state;
}

export default authentication;