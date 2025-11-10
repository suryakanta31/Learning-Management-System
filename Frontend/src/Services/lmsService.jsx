import api from "./api";

// ====================
// 🔹 Trainer Auth & CRUD
// ====================
export const trainerLogin = (data) => api.post("/api/trainers/login", data);
export const trainerSignup = (data) => api.post("/api/trainers/signup", data);

export const addTrainer = (adminId, data) =>
  api.post(`/api/trainers/add/${adminId}`, data);
export const getAllTrainers = () => api.get("/api/trainers");
export const updateTrainer = (id, data) =>
  api.put(`/api/trainers/update/${id}`, data);
export const deleteTrainer = (id) => api.delete(`/api/trainers/${id}`);

// ====================
// ✅ Trainer Dashboard APIs
// ====================
export const getTrainerCourses = (trainerId) =>
  api.get(`/api/trainers/${trainerId}/courses`);

export const getTrainerBatches = (trainerId) =>
  api.get(`/api/trainers/${trainerId}/batches`);

export const getTrainerSessions = (trainerId) =>
  api.get(`/api/trainers/${trainerId}/sessions`);

export const addTrainerSession = (data) => api.post(`/api/sessions`, data);

// ====================
// ✅ Trainer Reports APIs
// ====================
export const getTrainerReports = (trainerId) =>
  api.get(`/api/trainer-reports/${trainerId}/reports`);

export const addTrainerReport = (trainerId, data) =>
  api.post(`/api/trainer-reports/${trainerId}/reports`, data);

// Alias for Batches page
export const getBatchesForTrainer = (trainerId) =>
  api.get(`/api/trainers/${trainerId}/batches`);

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
export const updateCourse = (id, data) =>
  api.put(`/api/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/api/courses/${id}`);

// ====================
// 🔹 Batches CRUD
// ====================
export const addBatch = (data) => api.post("/api/batches", data);
export const getAllBatches = () => api.get("/api/batches");
export const updateBatch = (id, data) => api.put(`/api/batches/${id}`, data);
export const deleteBatch = (id) => api.delete(`/api/batches/${id}`);

// ====================
// 🔹 Reports (Admin & Trainer)
// ====================
export const getCoursePerformance = () =>
  api.get("/reports/course-performance");
export const getTrainerWorkload = () => api.get("/reports/trainer-workload");
export const getBatchSummary = () => api.get("/reports/batch-summary");

// ====================
// ✅ Default Export
// ====================
export default {
  // Trainers
  trainerLogin,
  trainerSignup,
  addTrainer,
  getAllTrainers,
  updateTrainer,
  deleteTrainer,
  getTrainerCourses,
  getTrainerBatches,
  getTrainerSessions,
  addTrainerSession,
  getTrainerReports,
  addTrainerReport,
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

  // Reports
  getCoursePerformance,
  getTrainerWorkload,
  getBatchSummary,
};

