import { combineReducers } from 'redux';

import events from './eventReducers.js';
import loading from '../components/Loading/reducers'

export const rootReducer = combineReducers({
    events,
    loading
});
