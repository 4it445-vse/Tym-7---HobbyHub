export const ADD_LOGIN = 'ADD_LOGIN';

export const addLogin = login => {
    return {
        type: ADD_LOGIN,
        login
    };
};
