import api from "./api";

// ====================
// 🔹 Trainer Auth & CRUD
// ====================
export const trainerLogin = (data) => api.post("/api/trainers/login", data);
export const trainerSignup = (data) => api.post("/api/trainers/signup", data);

export const addTrainer = (adminId, data) => api.post(`/api/trainers/add/${adminId}`, data);
export const getAllTrainers = () => api.get("/api/trainers");

export const updateTrainer = (id, data) => api.put(`/api/trainers/update/${id}`, data);
export const deleteTrainer = (id) => api.delete(`/api/trainers/${id}`);
export const getBatchesForTrainer = (id) => api.get(`/api/trainers/${id}/batches`);

// ====================
// 🔹 Admin Auth
// ====================
export const adminSignup = (data) => api.post("/api/admins/signup", data);
export const adminLogin = (data) => api.post("/api/admins/login", data);

// ====================
// 🔹 Courses CRUD
// ====================
export const addCourse = (data) => api.post("/api/courses", data);
export const getAllCourses = () => api.get("/api/courses");
export const updateCourse = (id, data) => api.put(`/api/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/api/courses/${id}`);

// ====================
// 🔹 Batches CRUD
// ====================
export const addBatch = (data) => api.post("/api/batches", data);
export const getAllBatches = () => api.get("/api/batches");
export const updateBatch = (id, data) => api.put(`/api/batches/${id}`, data);
export const deleteBatch = (id) => api.delete(`/api/batches/${id}`);

// ====================
// ✅ Default export (optional grouped object)
// ====================
export default {
  // Trainers
  trainerLogin,
  trainerSignup,
  addTrainer,
  getAllTrainers,
  updateTrainer,
  deleteTrainer,
  getBatchesForTrainer,

  // Admins
  adminSignup,
  adminLogin,

  // Courses
  addCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,

  // Batches
  addBatch,
  getAllBatches,
  updateBatch,
  deleteBatch,
};
