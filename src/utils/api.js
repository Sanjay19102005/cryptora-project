// API service for backend communication
// Auto-detect backend URL with sensible fallbacks:
// 1) VITE_API_URL if provided
// 2) Dev server (port 3000) -> use proxy via relative '/api'
// 3) Otherwise, default to localhost backend
const detectBaseUrl = () => {
  const envUrl = import.meta?.env?.VITE_API_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  if (typeof window !== 'undefined') {
    const { origin, port } = window.location;
    if (port === '3000') return '/api'; // Vite dev proxy
    if (port === '4173') return 'http://localhost:5000/api'; // vite preview -> use local backend
    // If same-origin backend is configured (e.g., via reverse proxy), use relative path
    return `${origin}/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = detectBaseUrl();

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Server error occurred' }));
    return { success: false, message: errorData.message || `Error: ${response.status} ${response.statusText}` };
  }
  return await response.json();
};

export const api = {
  // Sign up
  signup: async (username, email, password) => {
    try {
      const url = `${API_BASE_URL}/users/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running.' };
      }
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  },

  // Resend OTP
  resendOTP: async (email) => {
    try {
      const url = `${API_BASE_URL}/users/resend-otp`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Resend OTP error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running.' };
      }
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const url = `${API_BASE_URL}/auth/verify-otp`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Verify OTP error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running.' };
      }
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // Login
  login: async (username, password) => {
    try {
      const url = `${API_BASE_URL}/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running.' };
      }
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  },
};

