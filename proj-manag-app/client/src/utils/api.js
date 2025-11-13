import axios from 'axios';

// Create base axios instance for public endpoints (like auth)
const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// Create authenticated axios instance for protected endpoints
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// Request interceptor to add token to headers for authenticated requests only
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or invalid token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token might be expired or invalid, remove it
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optionally redirect to login page or show a message
      window.location.href = '/login'; // This is a simple approach
    }
    return Promise.reject(error);
  }
);

export { api, baseAxios };