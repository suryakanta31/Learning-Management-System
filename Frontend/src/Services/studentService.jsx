import api from "./api";

export const getAssignments = (studentId) =>
  api.get(`/student/${studentId}/assignments`);

export const getCertificates = (studentId) =>
  api.get(`/student/${studentId}/certificates`);

export const getSessions = (studentId) =>
  api.get(`/student/${studentId}/sessions`);

export const joinSession = (studentId, sessionData) =>
  api.post(`/student/${studentId}/join-session`, sessionData);
