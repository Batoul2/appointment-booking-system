const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Doctor = require("./models/Doctor");
const Patient = require("./models/Patient");
const Appointment = require("./models/Appointment");

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("MongoDB Connected");

    // Clear old data
    await Doctor.deleteMany();
    await Patient.deleteMany();
    await Appointment.deleteMany();

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
          start: "09:00",
          end: "17:00",
        },
      },

      {
        name: "Dr Karim",
        speciality: "Neurology",

        workingHours: {
          start: "10:00",
          end: "18:00",
        },
      },
    ]);

    const patients = await Patient.insertMany([
      {
        name: "Ali",
        phone: "03123456",
        email: "ali@test.com",
      },

      {
        name: "Maya",
        phone: "71111111",
        email: "maya@test.com",
      },

      {
        name: "John",
        phone: "70123456",
        email: "john@test.com",
      },

      {
        name: "Lina",
        phone: "76123456",
        email: "lina@test.com",
      },

      {
        name: "Omar",
        phone: "81123456",
        email: "omar@test.com",
      },
    ]);

    await Appointment.insertMany([
      {
        doctorId: doctors[0]._id,
        patientId: patients[0]._id,
        start: new Date("2026-05-20T08:00:00"),
        end: new Date("2026-05-20T08:30:00"),
        status: "Booked",
        reason: "Heart Checkup",
      },

      {
        doctorId: doctors[0]._id,
        patientId: patients[1]._id,
        start: new Date("2026-05-20T09:00:00"),
        end: new Date("2026-05-20T09:30:00"),
        status: "Cancelled",
        reason: "Follow-up",
      },

      {
        doctorId: doctors[1]._id,
        patientId: patients[2]._id,
        start: new Date("2026-05-21T11:00:00"),
        end: new Date("2026-05-21T11:30:00"),
        status: "Booked",
        reason: "Skin Allergy",
      },

      {
        doctorId: doctors[2]._id,
        patientId: patients[3]._id,
        start: new Date("2026-05-22T13:00:00"),
        end: new Date("2026-05-22T13:30:00"),
        status: "Booked",
        reason: "Migraine",
      },

      {
        doctorId: doctors[1]._id,
        patientId: patients[4]._id,
        start: new Date("2026-05-23T15:00:00"),
        end: new Date("2026-05-23T15:30:00"),
        status: "Cancelled",
        reason: "Routine Check",
      },
    ]);

    console.log("Seed data inserted");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();
