const { body } = require("express-validator");

const createAppointmentValidator = [
  body("doctorId").notEmpty().withMessage("Doctor ID is required"),

  body("patientId").notEmpty().withMessage("Patient ID is required"),

  body("start").notEmpty().withMessage("Start time is required"),

  body("end").notEmpty().withMessage("End time is required"),
];

module.exports = {
  createAppointmentValidator,
};
