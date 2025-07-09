import axios from 'axios';

// Set your backend base URL here
const API = axios.create({
  baseURL: 'http://localhost:5001/api', // Change port if needed
  withCredentials: true, // If your backend uses cookies for auth
});

// Add a request interceptor to include token if using JWT
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;