/**
 * Created by Honza on 30.10.2016.
 */
export const EVENT_ADD = 'EVENT_ADD';
export const EVENT_ADD_FAILED = 'EVENT_ADD_FAILED';
export const EVENT_ADDED = 'EVENT_ADDED';
export const EVENT_WAITING = 'EVENT_WAITING';

export const addEvent = event => {
  return {
    type: EVENT_ADD,
    event
  };
};

export const eventWaiting = event => {
  return {
    type: EVENT_WAITING,
    event
  }
}

export const eventAddFailed = event => {
  return {
    type: EVENT_ADD_FAILED,
    event
  }
}

export const eventAdded = () => {
  return {
    type: EVENT_ADDED
  }
}
