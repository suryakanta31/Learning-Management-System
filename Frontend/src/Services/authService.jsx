import api from "./api";

const authService = {
  signup: async (role, data) => {
    const res = await api.post(`/auth/${role}/signup`, data);
    return res.data;
  },

  login: async (role, creds) => {
    const res = await api.post(`/auth/${role}/login`, creds);
    if (res.data.token) {
      localStorage.clear();
      localStorage.setItem(`${role}Token`, res.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", res.data.email); // optional
    }
    return res.data;
  },

  logout: () => {
    const role = localStorage.getItem("role");
    localStorage.removeItem(`${role}Token`);
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  },

  // ✅ FIX: Add this missing function
  getCurrentUser: () => {
    const role = localStorage.getItem("role");
    if (!role) return null;

    const token = localStorage.getItem(`${role}Token`);
    if (!token) return null;

    return {
      token,
      role,
      email: localStorage.getItem("email") || null,
    };
  },
};

export default authService;
