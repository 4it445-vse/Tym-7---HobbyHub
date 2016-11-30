export const EVENT_SIGN_IN = 'EVENT_SIGN_IN';
export const EVENT_SIGN_OUT = 'EVENT_SIGN_OUT';
export const EVENT_ACCEPT_USER = 'EVENT_ACCEPT_USER';
export const EVENT_FIRE_USER = 'EVENT_FIRE_USER';

export const EVENT_USER_CHANGED_SUCCESS = 'EVENT_USER_CHANGED_SUCCESS';
export const EVENT_USER_CHANGED_ERROR = 'EVENT_USER_CHANGED_ERROR';

export const eventAcceptUser = eventInfo => {
  return {
    type: EVENT_ACCEPT_USER,
    eventInfo
  }
}

export const eventFireUser = eventInfo => {
  return {
    type: EVENT_FIRE_USER,
    eventInfo
  }
}

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
    created: "2016-11-13T00:00:00.000Z",
    resolved: "2016-11-13T00:00:00.000Z"
  };
  return {
    type: EVENT_SIGN_IN,
    postData
  }
}

export const eventSignOut = (eventId, userId) => {
  return {
    type: EVENT_SIGN_OUT,
    postData:{
      event_id: eventId,
      user_id: userId
    }
  }
}