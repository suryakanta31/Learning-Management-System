import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      // Demo Student Login
      if (email === "student@gmail.com" && password === "student123") {
        localStorage.setItem("studentToken", "loggedin");
        navigate("/student");
      } else {
        alert("Invalid credentials! Use student@gmail.com / student123");
      }
    } else {
      // Demo Student Sign Up
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Student registered with email: ${email}`);
      setIsSignIn(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isSignIn ? "Student Sign In" : "Student Sign Up"}</h2>
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

        {isSignIn && (
          <p className="login-demo-text">
            Demo Credentials: <strong>student@gmail.com / student123</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;

