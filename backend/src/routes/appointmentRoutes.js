const express = require("express");
const {
  createAppointment,
  cancelAppointment,
  getAppointments,
  getAppointmentsByDoctor,
} = require("../controllers/appointmentController");
const validationMiddleware = require("../middleware/validationMiddleware");
const {
  createAppointmentValidator,
} = require("../validators/appointmentValidators");

const router = express.Router();

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               patientId:
 *                 type: string
 *               start:
 *                 type: string
 *               end:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 */
router.post(
  "/",
  createAppointmentValidator,
  validationMiddleware,
  createAppointment,
);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List appointments
 */
router.get("/", getAppointments);

/**
 * @swagger
 * /api/appointments/{id}/cancel:
 *   post:
 *     summary: Cancel appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment cancelled
 */
router.post("/:id/cancel", cancelAppointment);

/**
 * @swagger
 * /api/appointments/doctor/{doctorId}:
 *   get:
 *     summary: Get appointments by doctor
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of doctor appointments
 */
router.get("/doctor/:doctorId", getAppointmentsByDoctor);

module.exports = router;
