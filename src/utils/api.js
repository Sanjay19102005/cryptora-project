// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000' };
      }
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  },

  // Resend OTP
  resendOTP: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Resend OTP error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000' };
      }
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Verify OTP error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000' };
      }
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // Login
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000' };
      }
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  },
};

