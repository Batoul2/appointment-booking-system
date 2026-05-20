const express = require("express");

const { getAvailability } = require("../controllers/availabilityController");

const router = express.Router();

/**
 * @swagger
 * /api/availability:
 *   get:
 *     summary: Get available slots
 *     tags: [Availability]
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Available time slots
 */
router.get("/", getAvailability);

module.exports = router;
