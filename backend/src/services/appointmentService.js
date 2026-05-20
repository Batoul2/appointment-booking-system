const Appointment = require("../models/Appointment");
const dayjs = require("dayjs");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
//const mongoose = require("mongoose");
const logger = require("../utils/logger");

const createAppointmentService = async (appointmentData) => {
  //const session = await mongoose.startSession();
  //session.startTransaction();

  try {
    const { doctorId, patientId, start, end, reason } = appointmentData;

    // Validate doctor
    const doctor = await Doctor.findById(doctorId); //.session(session);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Validate patient
    const patient = await Patient.findById(patientId); //.session(session);

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Validate dates
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    // Rule 1: Start must be before end
    if (startDate.isAfter(endDate)) {
      throw new Error("Start time must be before end time");
    }

    // Rule 2: Appointment must be within same day
    if (startDate.format("YYYY-MM-DD") !== endDate.format("YYYY-MM-DD")) {
      throw new Error("Appointment must be within current day");
    }

    // Rule 3: Appointment must be within dr working hours (bonus challenge--> dr schedule)
    const startHour = startDate.hour();
    const endHour = endDate.hour();

    const doctorStartHour = Number(doctor.workingHours.start.split(":")[0]);
    const doctorEndHour = Number(doctor.workingHours.end.split(":")[0]);

    if (startHour < doctorStartHour || endHour > doctorEndHour) {
      throw new Error("Appointment outside doctor working hours");
    }

    // Rule 4: No appointment can be booked for a time slot that overlaps with an existing appointment for the same doctor.
    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      status: "Booked",

      start: {
        $lt: endDate.toDate(),
      },

      end: {
        $gt: startDate.toDate(),
      },
    }); //.session(session);

    if (overlappingAppointment) {
      logger.info(`Overlap detected for doctor ${doctorId}`);
      throw new Error(
        "Doctor already has an appointment during this time slot",
      );
    }

    // const appointment = await Appointment.create(
    //   [
    //     {
    //       doctorId,
    //       patientId,
    //       start,
    //       end,
    //       reason,
    //     },
    //   ],
    //   { session },
    // );
    const appointment = await Appointment.create({
      doctorId,
      patientId,
      start,
      end,
      reason,
    });

    // await session.commitTransaction();
    // session.endSession();

    //return appointment[0];

    return appointment;
    logger.info("Appointment created successfully");
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    throw error;
  }
};

const cancelAppointmentService = async (id) => {
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    {
      status: "cancelled",
    },
    {
      //new: true,
      returnDocument: "after",
    },
  );

  if (!appointment) {
    throw new Error("No appointments found");
  }
  logger.info("Appointment cancelled successfully");
  return appointment;
};

const getAppointmentsService = async (query) => {
  const appointments = await Appointment.find()
    .populate("doctorId")
    .populate("patientId")
    .sort({
      start: 1,
    });

  return appointments;
};

const getAppointmentsByDoctorService = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const appointments = await Appointment.find({
    doctorId,
  })
    .populate("patientId")
    .sort({ start: 1 });

  if (appointments.length === 0) {
    return {
      message: "No appointments found",
    };
  }

  return appointments;
};

module.exports = {
  createAppointmentService,
  cancelAppointmentService,
  getAppointmentsService,
  getAppointmentsByDoctorService,
};
