import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-6vh9.onrender.com/api",
});

// 🔥 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });

  // ✅ Save token
  localStorage.setItem("token", res.data.token);

  return res.data; // { user, token }
};

// Register
export const registerUser = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data;
};
