import axios from 'axios';

const API_URL = 'https://todo-jdiu.onrender.com/api/auth';

export const registerUser = async (formData) => {
  return await axios.post(`${API_URL}/register`, formData);
};

export const loginUser = async (formData) => {
  return await axios.post(`${API_URL}/login`, formData);
};
