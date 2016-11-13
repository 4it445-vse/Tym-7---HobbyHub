export const ADD_LOGIN = 'ADD_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const addLogin = login => {
    return {
        type: ADD_LOGIN,
        login
    };
};

export const loginError = error => {
    return {
        type: LOGIN_ERROR,
        error
    };
};
