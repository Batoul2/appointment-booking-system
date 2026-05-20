import api from "./axios";

export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await api.post("/patients", patientData);

  return response.data;
};
