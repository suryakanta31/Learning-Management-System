import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css"; // make sure path is correct

const AdminLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("adminToken", "loggedin");
        navigate("/admin");
      } else {
        alert("Invalid credentials! Use admin@gmail.com / admin123");
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Admin registered with email: ${email}`);
      setIsSignIn(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isSignIn ? "Admin Sign In" : "Admin Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          {!isSignIn && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="login-input"
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
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>

        {isSignIn && (
          <p className="login-demo-text">
            Demo Credentials: <strong>admin@gmail.com / admin123</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

