import axios, { CancelToken } from 'axios';
import {API_BASE_URL} from './parameters.js';

const api = axios.create({
  baseURL: API_BASE_URL
});

export function getCancelTokenSource() {
  return CancelToken.source();
}

export default api;
