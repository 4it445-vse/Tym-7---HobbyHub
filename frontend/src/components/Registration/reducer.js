import {
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS
} from './actions';


export const registrationReducer = (state = { error: null, success: null }, action = {}) => {
    switch (action.type) {
        case REGISTRATION_ERROR:
            const { messages } = action.error.response.data.error.details;
            const error = messages;
            return {
                ...state,
                error
            };
        case REGISTRATION_SUCCESS:
            state.error = null;
            const newState = state;
            const success = true;
            return {
                ...newState,
                success
            };
        default:
            return state;
    }
};

export function isRegistrationSuccess(state) {
    return state.success;
}

export function getRegistrationError(state) {
    return  state.error;
}

export function hasRegistrationError(state) {
    return !!state.error;
}

export default registrationReducer;
