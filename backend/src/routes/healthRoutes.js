const express = require("express");

const { getHealthStatus } = require("../controllers/healthController");

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server health status
 */
router.get("/", getHealthStatus);

module.exports = router;
