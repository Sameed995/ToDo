import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError]=useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Navigate after component renders
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "#f9f9f9"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Login
        </button>
        {error && (
            <div style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "#fee2e2", // light red background
              color: "#b91c1c",           // dark red text
              fontWeight: "500",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}
        </form>
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        New user?{" "}
        <Link to="/register" style={{ color: "#4f46e5", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
