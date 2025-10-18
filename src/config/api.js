// src/config/api.js
const isDevelopment = import.meta.env.MODE === 'development' || 
                     import.meta.env.VITE_NODE_ENV === 'development';

// Use environment variable for API base URL, with fallback to automatic detection
const getApiBaseURL = () => {
  // Check if environment variable is set
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback to automatic detection
  return isDevelopment 
    ? 'http://localhost:3000' 
    : 'https://cisksbackend1-0.onrender.com';
};

export const API_CONFIG = {
  baseURL: `${getApiBaseURL()}/api`,
  timeout: 10000,
  withCredentials: true
};

// Helper function to get the correct API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// Default fetch options
export const defaultFetchOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
};

// API call wrapper
export const apiCall = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  const config = {
    ...defaultFetchOptions,
    ...options,
    headers: {
      ...defaultFetchOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.Message || 'Something went wrong');
    }
    
    return { data, response };
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};