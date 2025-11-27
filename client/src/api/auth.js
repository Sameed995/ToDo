import axios from 'axios';

// Use relative path so it works in both local and deployed environments
const API_URL = '/api/auth';

/**
 * Registers a new user
 * @param {Object} formData - { name?, email, password }
 * @returns {Promise} Axios response
 */
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response;
  } catch (error) {
    // Throw a more readable error message
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
    const response = await axios.post(`${API_URL}/login`, formData);
    return response;
  } catch (error) {
    // Throw a more readable error message
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
