import {AuthUser} from '../models/AuthUser';

import {AUTH_USER, UNAUTH_USER} from './types';

export const sendNotification = (message: string) => ({
    type: 'SHOW_NOTIFICATION',
    message,
});

export const loginUser = (authUser: AuthUser) => ({
    type: AUTH_USER,
    authUser,
});

export const logoutUser = () => ({
    type: UNAUTH_USER,
});