import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor ensures token is always sent on EVERY request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Fetch all todos
export const getTodos = async () => {
  const res = await API.get("/todos");
  return res.data;
};

// Create a new todo
export const createTodo = async (title, description = "") => {
  const res = await API.post("/todos", {
    title,
    description,
    status: "todo",
  });
  return res.data;
};

// Update a todo (status, title, etc.)
export const updateTodo = async (id, updates) => {
  const res = await API.put(`/todos/${id}`, updates);
  return res.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  console.log("🔵 Sending DELETE request for:", id);
  const res = await API.delete(`/todos/${id}`);
  console.log("🟢 Server response:", res.data);
  return res.data;
};

export default API;
