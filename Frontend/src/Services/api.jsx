import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Automatically attach token to every request
api.interceptors.request.use(
  (config) => {
    // check tokens in localStorage for any logged in role
    const adminToken = localStorage.getItem("adminToken");
    const trainerToken = localStorage.getItem("trainerToken");
    const studentToken = localStorage.getItem("studentToken");

    const token = adminToken || trainerToken || studentToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
