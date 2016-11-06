import api from '../api.js';

import {EVENT_ADD, EVENT_WAITING, EVENT_ADDED, EVENT_ADD_FAILED} from '../components/EventList/actions'

export const eventReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case EVENT_ADD:
      const {event} = action;
      api.post('events', event)
        .then((response) => {
          return {response: response.data};
        }).catch((error)=>{
          console.warn(error);
      });
      return state;
    case EVENT_WAITING:
      const newState = {
        ...state
      };
      newState.newEventState = EVENT_WAITING;
      return newState;
    case EVENT_ADDED:
      const newStateAdded = {
        ...state
      };
      newStateAdded.newEventState = EVENT_ADDED;
      return newStateAdded;
    case EVENT_ADD_FAILED:
      const newStateFailed = {
        ...state
      };
      newStateFailed.newEventState = EVENT_ADD_FAILED
      return newStateFailed;

    default:
      return state;
  }
};

export default eventReducer;

// selectors
