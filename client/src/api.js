import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-jdiu.onrender.com',
});

export default API;
