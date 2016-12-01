import {
  EVENT_USER_CHANGED_SUCCESS,
  EVENT_USER_CHANGED_ERROR,
  EVENT_FETCH_SUCCESS
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
    case EVENT_FETCH_SUCCESS:
      const {fetchEventUser} = action;
      return {
        ...state,
        ...fetchEventUser,
        fetched: true,
      }
    default:
      return state;
  }
};


export const getEventState =(state)=>{
  return state.status;
}

export const isFetching = (state) =>{
  return state.fetched===true;
}

export default eventReducer;