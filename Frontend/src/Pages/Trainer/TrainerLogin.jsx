import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { trainerLogin } from "../../services/lmsService";
import "../../index.css";

const TrainerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await trainerLogin(formData);
      const trainer = response.data;

      if (!trainer || !trainer.id) {
        throw new Error("Invalid trainer data from server");
      }

      // ✅ Store trainer info
      localStorage.setItem("trainerId", trainer.id);
      localStorage.setItem("trainerName", trainer.name);
      localStorage.setItem("trainerEmail", trainer.email);

      alert("✅ Login successful!");
      navigate("/trainer");
    } catch (error) {
      console.error("Trainer login error:", error);

      // 🧠 Handle HTTP errors more clearly
      if (error.response && error.response.status === 401) {
        alert("❌ Invalid email or password.");
      } else if (error.response) {
        alert(`⚠️ Server Error (${error.response.status}): ${error.response.data}`);
      } else {
        alert("❌ Unable to connect to server. Please check your backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Trainer Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
            disabled={loading}
          />

          {/* Password */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              style={{ paddingRight: "32px" }}
              required
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerLogin;

