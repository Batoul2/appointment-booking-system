const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const healthRoutes = require("./routes/healthRoutes");
const requestId = require("./middleware/requestId");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestId);
// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/health", healthRoutes);

app.use(errorMiddleware);

// Test Route to check if the server is running
app.get("/", (req, res) => {
  res.json({
    message: "Appointment Booking System API Running",
  });
});

module.exports = app;
