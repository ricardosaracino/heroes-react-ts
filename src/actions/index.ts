
import {AuthUser} from '../models/AuthUser';

import {AUTH_USER, UNAUTH_USER} from './types';


export const sendNotification = (message: string) => ({
    type: 'SHOW_NOTIFICATION',
    message,
});

export const loginUser = (au: AuthUser) => ({
    type: AUTH_USER,
    authUser: au
});

export const logoutUser = () => ({
    type: UNAUTH_USER,
});


/*
export function loginUser1(dispatch){

    dispatch({ type: UNAUTH_USER });

    cookie.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
}*/