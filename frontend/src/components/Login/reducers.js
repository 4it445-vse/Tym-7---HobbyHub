import {
    ADD_LOGIN,
    LOGIN_ERROR,
} from './actions';


export const eventReducer = (state = { error: null }, action = {}) => {
    switch (action.type) {
        case ADD_LOGIN:
            const { login } = action;
            return {
                ...state,
                authData: login,
                error: null,
            };
        case LOGIN_ERROR:
            const { error } = action;
            return {
                ...state,
                error,
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
