import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '../store/userStore';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.complicopilot.com';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore.getState();
    if (userStore.user) {
      // In a real app, you'd get the token from secure storage
      // For now, we'll use a placeholder
      config.headers.Authorization = `Bearer ${userStore.user.id}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear user data and redirect to login
          useUserStore.getState().logout();
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden:', data.message);
          break;
        case 404:
          // Not found
          console.error('Resource not found:', data.message);
          break;
        case 500:
          // Server error
          console.error('Server error:', data.message);
          break;
        default:
          console.error(`HTTP ${status}:`, data.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error: No response received');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Generic HTTP methods
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.get(url, config).then((response) => response.data),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    api.post(url, data, config).then((response) => response.data),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    api.put(url, data, config).then((response) => response.data),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    api.patch(url, data, config).then((response) => response.data),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.delete(url, config).then((response) => response.data),
};

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
  },
  user: {
    profile: '/user/profile',
    update: '/user/profile',
    avatar: '/user/avatar',
  },
  receipts: {
    list: '/receipts',
    create: '/receipts',
    get: (id: string) => `/receipts/${id}`,
    update: (id: string) => `/receipts/${id}`,
    delete: (id: string) => `/receipts/${id}`,
    process: (id: string) => `/receipts/${id}/process`,
  },
};

export default api; 