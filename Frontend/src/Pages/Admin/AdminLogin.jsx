import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true); // toggle between Sign In and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      // Sign In logic
      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("adminToken", "loggedin");
        navigate("/admin");
      } else {
        alert("Invalid credentials! Use admin@gmail.com / admin123");
      }
    } else {
      // Sign Up logic
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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">{isSignIn ? "Admin Sign In" : "Admin Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isSignIn && (
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer", fontWeight: "500" }}
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
          <p className="text-center mt-2 text-muted" style={{ fontSize: "0.8rem" }}>
            Demo Credentials: <strong>admin@gmail.com / admin123</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;


