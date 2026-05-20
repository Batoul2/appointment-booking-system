const { body } = require("express-validator");

const createDoctorValidator = [
  body("name").notEmpty().withMessage("Doctor name is required"),

  body("speciality").notEmpty().withMessage("Specialty is required"),
];

module.exports = {
  createDoctorValidator,
};
