import axios from 'axios';

// Backend URL
const API_URL = "https://todo-jdiu.onrender.com/api/auth";

/**
 * Registers a new user
 * @param {Object} formData - { username, email, password }
 * @returns {Promise} Axios response
 */
export const registerUser = async (formData) => {
  try {
    // Validate required fields
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // return only the data
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

/**
 * Logs in an existing user
 * @param {Object} formData - { email, password }
 * @returns {Promise} Axios response
 */
export const loginUser = async (formData) => {
  try {
    const { email, password } = formData;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // return only the data
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
