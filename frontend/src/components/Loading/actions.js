/**
 * Created by Honza on 30.10.2016.
 */
export const ADD_LOADING = 'ADD_WAITING'
export const REMOVE_LOADING = 'REMOVE_WAITING'

export const addLoading = () => {
  return {
    type: ADD_LOADING
  };
};

export const removeLoading = () => {
  return {
    type: REMOVE_LOADING
  };
};

