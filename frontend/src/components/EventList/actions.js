/**
 * Created by Honza on 30.10.2016.
 */
export const EVENT_ADD = 'EVENT_ADD';
export const EVENT_ADDED = 'EVENT_ADDED';

export const addEvent = event => {
  return {
    type: EVENT_ADD,
    event
  };
};

export const eventAdded = () => {
  return {
    type: EVENT_ADDED
  }
}
