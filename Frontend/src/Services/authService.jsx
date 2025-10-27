// src/Services/authService.js
import api from "./api";

const login = async (role, credentials) => {
  try {
    const res = await api.post(`/auth/${role}/login`, credentials);

    if (res.data.token) {
      // 🧠 Clear any old data first
      localStorage.removeItem("adminToken");
      localStorage.removeItem("trainerToken");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("role");

      // ✅ Then store the correct role and token
      localStorage.setItem(`${role}Token`, res.data.token);
      localStorage.setItem("role", role);
    }

    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    return { message: err.response?.data?.message || "Backend error!" };
  }
};

const signup = async (role, credentials) => {
  try {
    const res = await api.post(`/auth/${role}/signup`, credentials);
    return res.data;
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    return { message: err.response?.data?.message || "Backend error!" };
  }
};

const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("trainerToken");
  localStorage.removeItem("studentToken");
  localStorage.removeItem("role");
};

const getCurrentUser = () => {
  const role = localStorage.getItem("role");
  if (!role) return null;
  const token = localStorage.getItem(`${role}Token`);
  if (!token) return null;
  return { role, token };
};

export default { login, signup, logout, getCurrentUser };

