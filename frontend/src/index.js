import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setAuthToken } from './api.js';

import { configureStore } from './store/configureStore.js';
import { loadState, saveState } from './store/localState.js';

const persistedState = loadState();

if (
    persistedState && persistedState.login &&
    persistedState.login.authData && persistedState.login.authData.id
) {
    setAuthToken(persistedState.login.authData.id)
}


const store = configureStore(persistedState, saveState);

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
