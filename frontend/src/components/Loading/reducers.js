/**
 * Created by Honza on 30.10.2016.
 */
import {
  ADD_LOADING,
  REMOVE_LOADING
} from './actions';

export const loadingReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_LOADING:
      const newStateAddLoading = {
        ...state
      };
      if(typeof  newStateAddLoading.isLoading === "undefined")
        newStateAddLoading.isLoading=0;
      newStateAddLoading.isLoading += 1;
      return newStateAddLoading;
    case REMOVE_LOADING:
      const newStateRemoveLoading = {
        ...state
      };
      newStateRemoveLoading.isLoading = (state.isLoading <= 1 ? 0 : state.isLoading -= 1);
      return newStateRemoveLoading;
    default:
      return state;
  }
};

export default loadingReducer;

// selectors
