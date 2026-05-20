const express = require("express");
const {
  createPatient,
  getPatients,
} = require("../controllers/patientController");
const validationMiddleware = require("../middleware/validationMiddleware");

const { createPatientValidator } = require("../validators/patientValidators");

const router = express.Router();

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 */
router.post("/", createPatientValidator, validationMiddleware, createPatient);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get("/", getPatients);

module.exports = router;
