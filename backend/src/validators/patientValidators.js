const { body } = require("express-validator");

const createPatientValidator = [
  body("name").notEmpty().withMessage("Patient name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

module.exports = {
  createPatientValidator,
};
