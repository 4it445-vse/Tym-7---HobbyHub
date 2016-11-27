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
    const { success } = state;
    return success;
}

export function getRegistrationError(state) {
    const { error }  = state;
    return error;
}

export function hasRegistrationError(state) {
    const { error }  = state;
    return !!error;
}

export default registrationReducer;
