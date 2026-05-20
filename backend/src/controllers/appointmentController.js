const {
  createAppointmentService,
  cancelAppointmentService,
  getAppointmentsService,
  getAppointmentsByDoctorService,
} = require("../services/appointmentService");

const createAppointment = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService(req.body);

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await cancelAppointmentService(req.params.id);

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await getAppointmentsService(req.query);

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

const getAppointmentsByDoctor = async (req, res, next) => {
  try {
    const appointments = await getAppointmentsByDoctorService(
      req.params.doctorId,
    );

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  cancelAppointment,
  getAppointments,
  getAppointmentsByDoctor,
};
