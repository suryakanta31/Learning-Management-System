import api from "./api";

// --- Students ---
export const addStudent = (data) => api.post("/admin/students", data);
export const getAllStudents = () => api.get("/admin/students");
export const updateStudent = (id, data) => api.put(`/admin/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/admin/students/${id}`);

// --- Trainers ---
export const addTrainer = (data) => api.post("/admin/trainers", data);
export const getAllTrainers = () => api.get("/admin/trainers");
export const updateTrainer = (id, data) => api.put(`/admin/trainers/${id}`, data);
export const deleteTrainer = (id) => api.delete(`/admin/trainers/${id}`);

// --- Courses ---
export const addCourse = (data) => api.post("/admin/courses", data);
export const getAllCourses = () => api.get("/admin/courses");
export const updateCourse = (id, data) => api.put(`/admin/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/admin/courses/${id}`);

