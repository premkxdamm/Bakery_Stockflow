import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error.response?.data?.message || error.message || 'An error occurred while connecting to server';
    return Promise.reject(new Error(errorMsg));
  }
);

// --- Backend Health Check ---
export const checkBackendHealth = () => api.get('/health');

// --- Dashboard Stats ---
export const getDashboardStats = () => api.get('/dashboard/stats');

// --- Products CRUD & Filters ---
export const getProducts = (search = '', category = '', status = '') => {
  const params = {};
  if (search && search.trim() !== '') params.search = search.trim();
  if (category && category !== 'ALL') params.category = category;
  if (status && status !== 'ALL') params.status = status;
  return api.get('/products', { params });
};

export const getProductById = (id) => api.get(`/products/${id}`);

export const createProduct = (productData) => api.post('/products', productData);

export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

// --- Quick Stock Movement ---
export const adjustStock = (id, quantityChanged) => {
  return api.post(`/products/${id}/stock`, {
    quantityChanged: Number(quantityChanged),
  });
};

// --- Categories ---
export const getCategories = () => api.get('/products/categories');

export default api;
