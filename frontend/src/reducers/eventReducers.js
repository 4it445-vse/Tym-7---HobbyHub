import api from '../api.js';

import {
    EVENT_ADD
} from '../actions/eventActions.js';

export const eventReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case EVENT_ADD:
            const { event } = action;
            api.post('events', event)
                .then((response) => {
                    return { response: response.data };
                });

            return state;

        default:
            return state;
    }
};

export default eventReducer;

// selectors
