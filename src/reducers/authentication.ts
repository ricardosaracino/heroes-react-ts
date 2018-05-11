import {AUTH_ERROR, AUTH_USER, UNAUTH_USER,} from '../actions/types';

const INITIAL_STATE = {error: '', message: '', content: '', authenticated: false};

const authentication = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case AUTH_USER:
            return {...state, error: '', message: '', authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR:
            return {...state, error: action.payload};
    }

    return state;
}

export default authentication;