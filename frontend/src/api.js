import axios, { CancelToken } from 'axios';
import {parameters} from './../parameters.js';

const {API_BASE_URL} = parameters;

const api = axios.create({
  baseURL: API_BASE_URL
});

export function getCancelTokenSource() {
  return CancelToken.source();
}

export default api;
