import moment from 'moment';
export const EVENT_SIGN_IN = 'EVENT_SIGN_IN';
export const EVENT_SIGN_OUT = 'EVENT_SIGN_OUT';
export const EVENT_FETCH = 'EVENT_FETCH';

export const EVENT_FETCH_SUCCESS = 'EVENT_FETCH_SUCCESS';
export const EVENT_FETCH_ERROR = 'EVENT_FETCH_ERROR';
export const EVENT_USER_CHANGED_SUCCESS = 'EVENT_USER_CHANGED_SUCCESS';
export const EVENT_USER_CHANGED_ERROR = 'EVENT_USER_CHANGED_ERROR';

export const eventUserChangedSuccess = (eventUser)=> {
  return {
    type: EVENT_USER_CHANGED_SUCCESS,
    eventUser
  }
}

export const eventUserChangedError = (error)=> {
  return {
    type: EVENT_USER_CHANGED_ERROR,
    error
  }
}

export const eventSignIn = (eventId, userId) => {
  const postData = {
    event_id: eventId,
    user_id: userId,
    status: "pending",
    created: moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
    resolved: moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
  };
  return {
    type: EVENT_SIGN_IN,
    postData
  }
}

export const eventSignOut = (eventId, userId) => {
  return {
    type: EVENT_SIGN_OUT,
    postData: {
      event_id: eventId,
      user_id: userId
    }
  }
}

export const fetchEvent = (user_id, event_id)=> {
  return {
    type: EVENT_FETCH,
    postData: {user_id, event_id}
  }
}

export const fetchEventSuccess = fetchEventUser => {
  return {
    type: EVENT_FETCH_SUCCESS,
    fetchEventUser
  }
}

export const fetchEventError = error => {
  return {
    type: EVENT_FETCH_ERROR,
    error
  }
}