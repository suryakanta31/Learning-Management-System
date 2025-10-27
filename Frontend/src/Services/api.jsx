import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // load from .env
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const trainerToken = localStorage.getItem("trainerToken");
  const studentToken = localStorage.getItem("studentToken");

  const token = adminToken || trainerToken || studentToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

