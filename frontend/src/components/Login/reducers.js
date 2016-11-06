import {
    ADD_LOGIN
} from './actions';


export const eventReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case ADD_LOGIN:
            const {login} = action;
            return login;
        default:
            return state;
    }
};

export default eventReducer;
