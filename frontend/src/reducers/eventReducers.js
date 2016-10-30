import api from '../api.js';

import {
  ADD_LOADING,
  REMOVE_LOADING
} from '../components/Loading/actions';
import {EVENT_ADD} from '../components/EventList/actions'

export const eventReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case EVENT_ADD:
      const {event} = action;
      api.post('events', event)
        .then((response) => {
          return {response: response.data};
        });

      return state;
    default:
      return state;
  }
};

export default eventReducer;

// selectors
