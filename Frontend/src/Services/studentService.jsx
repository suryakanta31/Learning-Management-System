import api from "./api";

const getAssignments = () => api.get("/student/assignments");
const getCertificates = () => api.get("/student/certificates");
const getSessions = () => api.get("/student/sessions");
const submitAssignment = (assignment) => api.post("/student/assignments", assignment);

export default {
  getAssignments,
  getCertificates,
  getSessions,
  submitAssignment,
};

