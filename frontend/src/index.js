import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setAuthToken, checkAuthToken } from './api.js';

import { configureStore } from './store/configureStore.js';
import { loadState, saveState } from './store/localState.js';

/* eslint-disable no-alert, no-console */

const persistedState = loadState();

/**
Checks if user is logged in and saves him state
*/
if (
    persistedState && persistedState.login &&
    persistedState.login.authData && persistedState.login.authData.id
) {
    setAuthToken(persistedState.login.authData.id)
}

const store = configureStore(persistedState, saveState);
checkAuthToken(store);

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);

export default store;
