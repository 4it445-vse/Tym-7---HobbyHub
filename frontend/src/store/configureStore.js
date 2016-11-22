import throttle from 'lodash/throttle';
import { createStore } from 'redux'

import { rootReducer } from '../reducers'

function stateThatShouldBeSaved(state) {
    const {
        login,
        } = state;

    return {
        login
    };
}

export function configureStore(preloadedState, saveState) {
    const store = createStore(
        rootReducer,
        preloadedState
    );

    if (saveState) {
        store.subscribe(throttle(() => {
            const state = store.getState();
            const stateToSave = stateThatShouldBeSaved(state);
            saveState(stateToSave);
        }, 1000));
    }

    return store;
}
