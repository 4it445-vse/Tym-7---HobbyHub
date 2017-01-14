import axios, { CancelToken } from 'axios';
import {API_BASE_URL} from './parameters.js';
import store from './index.js';
import { logout } from './components/Login/actions.js';
import { isLoggedIn } from './components/Login/reducers.js';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { login } = store.getState();
  if (error.response.status === 401 && isLoggedIn(login)) {
    store.dispatch(logout());
  }
  return Promise.resolve({ error });
});

export function getCancelTokenSource() {
  return CancelToken.source();
}

export function setAuthToken(authToken) {
  if (authToken === 'undefined') {
    delete api.defaults.headers.common['Authorization'];
  } else {
    api.defaults.headers.common['Authorization'] = authToken;
  }
}

export function checkAuthToken(localStore) {
  const { login } = localStore.getState();
  if (isLoggedIn(login)) {
    api.get('appusers/');
  }
}

export default api;
