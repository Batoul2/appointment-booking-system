require("dotenv").config();

const connectDB = require("./config/db");
const logger = require("./utils/logger");
const Doctor = require("./models/Doctor");
const Patient = require("./models/Patient");
const Appointment = require("./models/Appointment");

const seedData = async () => {
  try {
    // Connect database
    await connectDB();

    logger.info("Starting database seed");

    // Clear old data
    await Appointment.deleteMany();
    await Doctor.deleteMany();
    await Patient.deleteMany();

    logger.info("Old data cleared");

    // Insert doctors
    const doctors = await Doctor.insertMany([
      {
        name: "Dr Ahmad",
        speciality: "Cardiology",

        workingHours: {
          start: "08:00",
          end: "14:00",
        },
      },

      {
        name: "Dr Sarah",
        speciality: "Dermatology",

        workingHours: {
          start: "12:00",
          end: "20:00",
        },
      },
    ]);

    logger.info("Doctors inserted");

    // Insert patients
    const patients = await Patient.insertMany([
      {
        name: "Ali",
        email: "ali@test.com",
        phone: "03123456",
      },

      {
        name: "Sara",
        email: "sara@test.com",
        phone: "03987654",
      },
    ]);

    logger.info("Patients inserted");

    // Insert appointment
    await Appointment.create({
      doctorId: doctors[0]._id,
      patientId: patients[0]._id,

      start: new Date("2026-05-20T10:00:00"),

      end: new Date("2026-05-20T10:30:00"),

      reason: "General Checkup",
    });

    logger.info("Appointments inserted");

    logger.info("Database seed completed successfully");

    process.exit();
  } catch (error) {
    logger.error(error.message);

    process.exit(1);
  }
};

seedData();
