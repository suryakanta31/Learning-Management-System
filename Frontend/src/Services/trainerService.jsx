import api from "./api";

const getMyBatches = () => api.get("/trainer/batches");
const getMyCourses = () => api.get("/trainer/courses");
const submitFeedback = (feedback) => api.post("/trainer/feedback", feedback);
const markAttendance = (attendance) => api.post("/trainer/attendance", attendance);

export default {
  getMyBatches,
  getMyCourses,
  submitFeedback,
  markAttendance,
};
