import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5073/api',
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product APIs
export const fetchProducts = (params) => API.get('/products', { params });
export const fetchFeaturedProducts = () => API.get('/products/featured');
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const fetchBrands = () => API.get('/products/brands');

// Auth APIs
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getProfile = () => API.get('/auth/profile');

// Cart APIs
export const fetchCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart', data);
export const updateCartItem = (itemId, data) => API.put(`/cart/${itemId}`, data);
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);
export const clearCart = () => API.delete('/cart');

// Order APIs
export const createOrder = (data) => API.post('/orders', data);
export const fetchOrders = () => API.get('/orders');
export const fetchOrder = (id) => API.get(`/orders/${id}`);
export const createPaymentIntent = (data) => API.post('/orders/create-payment-intent', data);

export default API;
