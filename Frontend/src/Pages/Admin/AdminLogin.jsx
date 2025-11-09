import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/lmsService";
import "../../index.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });

      if (res.data) {
        const admin = res.data;

        // ✅ Store all admin details in localStorage
        localStorage.setItem("adminId", admin.id); // critical for Trainer add API
        localStorage.setItem("adminName", admin.name);
        localStorage.setItem("adminEmail", admin.email);
        localStorage.setItem("adminToken", admin.token || "dummyToken");

        alert("✅ Admin login successful!");
        navigate("/admin"); // Redirect to Admin Dashboard
      } else {
        alert("❌ Invalid credentials!");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      alert(err.response?.data?.message || "⚠️ Login failed! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
            autoComplete="username"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
            autoComplete="current-password"
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;





