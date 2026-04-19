import { apiClient } from '@/api/apiClient.js';
import { getUserToken } from '@/storage/sessionStorage.js';

const getAuthHeaders = () => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/api/orders', orderData, {
      headers: getAuthHeaders(),
    });
    return response?.data || null;
  } catch (err) {
    console.error('Error creating order:', err);
    return null;
  }
};
