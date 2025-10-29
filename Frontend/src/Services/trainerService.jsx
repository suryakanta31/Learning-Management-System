import api from "./api";

// Trainer Dashboard
export const getMyBatches = (trainerId) => api.get(`/trainer/${trainerId}/batches`);

// Attendance
export const markAttendance = (trainerId, data) =>
  api.post(`/trainer/${trainerId}/attendance`, data);

// Feedback
export const submitFeedback = (trainerId, data) =>
  api.post(`/trainer/${trainerId}/feedback`, data);

// My Courses
export const getMyCourses = (trainerId) => api.get(`/trainer/${trainerId}/courses`);
