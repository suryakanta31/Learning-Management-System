// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ backend base URL
  headers: {
    "Content-Type": "application/json", // ✅ Ensure JSON is always sent
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const trainerToken = localStorage.getItem("trainerToken");
    const token = adminToken || trainerToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
