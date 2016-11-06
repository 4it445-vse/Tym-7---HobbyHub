import { combineReducers } from 'redux';

import events from './eventReducers.js';
import loading from '../components/Loading/reducers';
import login from '../components/Login/reducers';

export const rootReducer = combineReducers({
    events,
    loading,
    login
});
