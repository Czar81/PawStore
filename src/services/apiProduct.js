import { apiClient } from '@/api/apiClient.js';
import { getUserToken } from '@/storage/sessionStorage.js';

const getAuthHeaders = () => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await apiClient.get(`/products${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response?.data?.products || [];
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
};

export const getProductById = async (id_product) => {
  try {
    const response = await apiClient.get(`/products/${id_product}`, {
      headers: getAuthHeaders(),
    });
    return response?.data?.product || null;
  } catch (err) {
    console.error(`Error fetching product ${id_product}:`, err);
    return null;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData, {
      headers: getAuthHeaders(),
    });
    return response?.data || null;
  } catch (err) {
    console.error('Error creating product:', err);
    return null;
  }
};

export const updateProduct = async (id_product, productData) => {
  try {
    const response = await apiClient.put(`/products/${id_product}`, productData, {
      headers: getAuthHeaders(),
    });
    return response?.data || null;
  } catch (err) {
    console.error(`Error updating product ${id_product}:`, err);
    return null;
  }
};

export const deleteProduct = async (id_product) => {
  try {
    const response = await apiClient.delete(`/products/${id_product}`, {
      headers: getAuthHeaders(),
    });
    return response?.data || null;
  } catch (err) {
    console.error(`Error deleting product ${id_product}:`, err);
    return null;
  }
};
