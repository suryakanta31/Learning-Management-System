import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css"; // Make sure your global CSS is imported

const TrainerLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      // Demo Trainer Login
      if (email === "trainer@gmail.com" && password === "trainer123") {
        localStorage.setItem("trainerToken", "loggedin");
        navigate("/trainer");
      } else {
        alert("Invalid credentials! Use trainer@gmail.com / trainer123");
      }
    } else {
      // Demo Sign Up
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Trainer registered with email: ${email}`);
      setIsSignIn(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">{isSignIn ? "Trainer Sign In" : "Trainer Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isSignIn && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="btn-login">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="login-toggle">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setIsSignIn(!isSignIn); setEmail(""); setPassword(""); setConfirmPassword(""); }}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>

        {isSignIn && (
          <p className="login-demo">
            Demo Credentials: <strong>trainer@gmail.com / trainer123</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default TrainerLogin;
