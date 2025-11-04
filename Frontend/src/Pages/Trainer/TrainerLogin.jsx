import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainerLogin, trainerSignup } from "../../Services/lmsService";

import "../../index.css";

const TrainerLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignIn) {
        const res = await trainerLogin({ email, password }); // ✅ use trainerLogin
        if (res.data?.token) {
          alert("✅ Trainer login successful!");
          navigate("/trainer");
        } else {
          alert(res.data?.message || "❌ Invalid credentials!");
        }
      } else {
        if (password !== confirmPassword) {
          alert("⚠️ Passwords do not match!");
          return;
        }

        const res = await trainerSignup({ email, password }); // ✅ use trainerSignup
        alert(res.data?.message || "✅ Signup successful!");
        setIsSignIn(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "⚠️ Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          {isSignIn ? "Trainer Sign In" : "Trainer Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
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

export default TrainerLogin;



