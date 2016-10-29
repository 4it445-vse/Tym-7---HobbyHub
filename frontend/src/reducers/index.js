import { combineReducers } from 'redux';

import events from './eventReducers.js';

export const rootReducer = combineReducers({
    events
});
