import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { COLORS } from "../utils/color";

export default function Navbar({ tasks }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 50px",
        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "0 0 12px 12px",
        color: COLORS.navbarText,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "16px" }}>
        Total Tasks: {tasks.todo.length + tasks["in-progress"].length + tasks.done.length}
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          letterSpacing: "1.5px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        📝 My To-Do Board
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span
          style={{
            background: COLORS.userBadge,
            padding: "5px 12px",
            borderRadius: "20px",
            fontWeight: "500",
          }}
        >
          Logged in as: {user?.name || "Guest"}
        </span>
        <button
          onClick={logout}
          style={{
            background: COLORS.logoutButton,
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            color: COLORS.navbarText,
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = COLORS.logoutButtonHover)}
          onMouseOut={(e) => (e.target.style.background = COLORS.logoutButton)}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
