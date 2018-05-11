
import { combineReducers } from 'redux';

import authentication from './authentication';
import notification from './notification';

export default combineReducers({
    notification,
    authentication
});