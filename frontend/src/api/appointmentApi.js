import api from "./axios";

export const getAvailability = async (doctorId, date) => {
  const response = await api.get(
    `/availability?doctorId=${doctorId}&date=${date}`,
  );

  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post(`/appointments`, appointmentData);

  return response.data;
};

export const getAppointments = async (doctorId) => {
  const response = await api.get(`/appointments/doctor/${doctorId}`);

  return response.data;
};

export const cancelAppointment = async (appointmentId) => {
  const response = await api.post(`/appointments/${appointmentId}/cancel`);

  return response.data;
};
