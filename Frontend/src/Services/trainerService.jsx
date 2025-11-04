// src/services/trainerService.js
import api from "./api";

const TrainerService = {
  getTrainerBatches: (trainerId) => api.get(`/trainer/${trainerId}/batches`),
  getTrainerCourses: (trainerId) => api.get(`/trainer/${trainerId}/courses`),
  getTrainerSchedule: (trainerId) => api.get(`/trainer/${trainerId}/schedule`),
  // add other trainer-related APIs here
};

export default TrainerService;
