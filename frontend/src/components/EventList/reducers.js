import {
  EVENT_USER_CHANGED_SUCCESS,
  EVENT_USER_CHANGED_ERROR,
} from './actions';


export const eventReducer = (state={}, action = {}) => {
  switch (action.type) {
    case EVENT_USER_CHANGED_SUCCESS:
      const {eventUser} = action;
      return {
        ...state,
        ...eventUser
      }
    case EVENT_USER_CHANGED_ERROR:
      const { error } = action;
      return {
        ...state,
        error
      };
    default:
      return state;
  }
};


export const getEventState =(state)=>{
  return state.status;
}

export default eventReducer;