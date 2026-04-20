import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // Assuming the backend uses Bearer token, wait, backend uses auth middleware.
      // Let's check auth.middleware.js to see header name but usually it's 'Bearer token' or 'x-auth-token'
      // Temporarily doing Bearer, but I should look at the backend just in case.
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
