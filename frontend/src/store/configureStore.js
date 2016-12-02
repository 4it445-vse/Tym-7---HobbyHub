import throttle from 'lodash/throttle';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import eventRootSaga from '../components/EventList/sagas'

import { rootReducer } from '../reducers/index'

function stateThatShouldBeSaved(state) {
    const {
        login,
        } = state;

    return {
        login
    };
}

export function configureStore(preloadedState, saveState) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(eventRootSaga);

    if (saveState) {
        store.subscribe(throttle(() => {
            const state = store.getState();
            const stateToSave = stateThatShouldBeSaved(state);
            saveState(stateToSave);
        }, 1000));
    }

    return store;
}
