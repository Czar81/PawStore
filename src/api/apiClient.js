import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});
