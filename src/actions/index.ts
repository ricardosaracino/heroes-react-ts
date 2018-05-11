import {AUTH_USER} from './types';

export const sendNotification = (message: string) => ({
    type: 'SHOW_NOTIFICATION',
    message,
});

export const loginUser = () => ({
    type: AUTH_USER,
});