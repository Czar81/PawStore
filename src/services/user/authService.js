import { apiClient } from '@/api/apiClient.js';
import {
  setUserToken,
  getUserToken,
  clearUserToken,
} from '@/storage/sessionStorage.js';

export const signUp = async (data) => {
  try {
    const response = await apiClient.post('/register', data);
    if (response?.data?.token) {
      setUserToken(response.data.token);
      return response.data;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const login = async (data) => {
  try {
    const response = await apiClient.post('/login', data);
    console.log('Response completo:', response?.data);
    if (response?.data?.token) {
      setUserToken(response.data.token);
      return response.data;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const checkSession = async () => {
  try {
    const token = getUserToken();
    const response = await apiClient
      .get('/me', { headers: { Authorization: `Bearer ${token}` } });
    return response?.status === 200 ? true : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const logout = () => {
  clearUserToken();
};
