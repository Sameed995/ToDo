import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(name, email, password);
      setSuccess("Registration successful! Please log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div style={{
      background: "var(--card-bg)",
      padding: "40px 30px",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "var(--primary)" }}>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {error && (
            <div style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "#fee2e2", // light red
              color: "#b91c1c",           // dark red text
              fontWeight: "500",
              textAlign: "center"
            }}> 
              {error}
            </div>
          )}
          {success && (
            <div style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
             backgroundColor: "#dcfce7", // light green
              color: "#166534",           // dark green
              fontWeight: "500",
              textAlign: "center"
            }}>
          {success}
          </div>
          )}
          </form>
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
