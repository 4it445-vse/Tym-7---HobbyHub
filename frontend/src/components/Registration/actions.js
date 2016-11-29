export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const registrationError = error => {
    return {
        type: REGISTRATION_ERROR,
        error
    };
};

export const registrationSuccess = () => {
    return {
        type: REGISTRATION_SUCCESS
    };
};
