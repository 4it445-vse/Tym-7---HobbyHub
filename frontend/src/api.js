import axios, { CancelToken } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

export function getCancelTokenSource() {
  return CancelToken.source();
}

export default api;
