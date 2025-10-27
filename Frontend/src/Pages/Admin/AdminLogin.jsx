import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authService";
import "../../index.css";

const AdminLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignIn) {
        const res = await authService.login("admin", { email, password });
        if (res.token) {
          alert("Admin login successful!");
          navigate("/admin");
        } else {
          alert(res.message || "Invalid credentials!");
        }
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        const res = await authService.signup("admin", { name, email, password });
        alert(res.message || "Signup successful!");
        setIsSignIn(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          {isSignIn ? "Admin Sign In" : "Admin Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          {!isSignIn && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {!isSignIn && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login-input"
              required
            />
          )}
          <button type="submit" className="login-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="login-toggle-text">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="login-toggle-link"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

