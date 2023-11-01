import http from "../utils/http";

export const getStudents = () => http.get(`/api/students`);
export const getStudent = (id: string | number) =>
  http.get(`/api/students/${id}`);
