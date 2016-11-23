import { combineReducers } from 'redux';

import loading from '../components/Loading/reducers';
import login from '../components/Login/reducers';
import registration from '../components/Registration/reducer.js';

export const rootReducer = combineReducers({
    loading,
    login,
    registration
});
