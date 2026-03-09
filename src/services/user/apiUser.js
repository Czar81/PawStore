import { apiClient } from '@/api/apiClient.js';
import { getUserToken } from '@/storage/sessionStorage.js';

const getAuthHeaders = () => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/me', {
      headers: getAuthHeaders(),
    });
    return response?.data?.user?.[0] || null;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users', {
      headers: getAuthHeaders(),
    });
    return response?.data || [];
  } catch (err) {
    console.error('Error fetching users:', err);
    return [];
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await apiClient.put('/me', userData, {
      headers: getAuthHeaders(),
    });
    return response?.data || null;
  } catch (err) {
    console.error('Error updating profile:', err);
    return null;
  }
};

export const deleteProfile = async () => {
  try {
    const response = await apiClient.delete('/me', {
      headers: getAuthHeaders(),
    });
    return response?.data || null;
  } catch (err) {
    console.error('Error deleting profile:', err);
    return null;
  }
};
