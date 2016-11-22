import {
    ADD_LOGIN,
    LOGIN_ERROR,
    LOGOUT
} from './actions';
import { setAuthToken } from '../../api.js';
import api from '../../api.js';


export const eventReducer = (state = { error: null }, action = {}) => {
    switch (action.type) {
        case ADD_LOGIN:
            const { login } = action;
            setAuthToken(login.id);
            return {
                ...state,
                authData: login,
                error: null
            };
        case LOGIN_ERROR:
            const { error } = action;
            return {
                ...state,
                error
            };
        case LOGOUT:
            //disable auth token on backend
            api.post('appusers/logout');
            //remove it from header
            setAuthToken(undefined);
            //remove it from store
            return {
            };
        default:
            return state;
    }
};

export function isLoggedIn(state) {
    const { authData = {} }  = state;
    return !!authData.id;
}

export function getAuthToken(state) {
    const { authData }  = state;
    if (!authData || !authData.id) { return null; }
    return authData.id;
}

export function getLoginError(state) {
    const { error }  = state;
    return error;
}

export function hasLoginError(state) {
    const { error }  = state;
    return !!error;
}

export function getUserId(state) {
    const { authData }  = state;
    if (!authData || !authData.userId) { return null; }
    return authData.userId;
}

export default eventReducer;
