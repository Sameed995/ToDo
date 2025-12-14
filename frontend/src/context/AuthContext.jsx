import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user & token from localStorage on page load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to load auth data from localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axios.post("https://todo-6vh9.onrender.com/api/auth/login", { email, password });

    const userData = {
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", res.data.token);

    // Attach token for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

    return res.data;
  };

  // Register function
  const register = async (name, email, password) => {
    const res = await axios.post("https://todo-6vh9.onrender.com/api/auth/register", { name, email, password });
    return res.data;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
