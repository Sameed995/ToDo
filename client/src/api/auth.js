import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (formData) => {
  return await axios.post(`${API_URL}/register`, formData);
};

export const loginUser = async (formData) => {
  return await axios.post(`${API_URL}/login`, formData);
};
