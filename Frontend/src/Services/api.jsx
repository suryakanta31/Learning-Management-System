import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ no double /api/api
});

api.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem(`${role}Token`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
