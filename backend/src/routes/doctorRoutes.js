const express = require("express");
const { createDoctor, getDoctors } = require("../controllers/doctorController");
const validationMiddleware = require("../middleware/validationMiddleware");

const { createDoctorValidator } = require("../validators/doctorValidators");

const router = express.Router();

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               speciality:
 *                 type: string
 *               workingHours:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: string
 *                   end:
 *                     type: string
 *     responses:
 *       201:
 *         description: Doctor created successfully
 */
router.post("/", createDoctorValidator, validationMiddleware, createDoctor);

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get("/", getDoctors);

module.exports = router;
