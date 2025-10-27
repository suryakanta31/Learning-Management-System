import api from "./api";

const getAllStudents = () => api.get("/admin/students");
const getAllTrainers = () => api.get("/admin/trainers");
const addStudent = (student) => api.post("/admin/students", student);
const addTrainer = (trainer) => api.post("/admin/trainers", trainer);
const updateStudent = (id, student) => api.put(`/admin/students/${id}`, student);
const deleteStudent = (id) => api.delete(`/admin/students/${id}`);
const updateTrainer = (id, trainer) => api.put(`/admin/trainers/${id}`, trainer);
const deleteTrainer = (id) => api.delete(`/admin/trainers/${id}`);

export default {
  getAllStudents,
  getAllTrainers,
  addStudent,
  addTrainer,
  updateStudent,
  deleteStudent,
  updateTrainer,
  deleteTrainer,
};

