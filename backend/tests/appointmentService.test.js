const Appointment = require("../src/models/Appointment");

const Doctor = require("../src/models/Doctor");

const Patient = require("../src/models/Patient");

const {
  createAppointmentService,
} = require("../src/services/appointmentService");

jest.mock("../src/models/Appointment");

jest.mock("../src/models/Doctor");

jest.mock("../src/models/Patient");

describe("Appointment Service Tests", () => {
  //first test to check for overlapping appointments
  test("Should reject overlapping appointment", async () => {
    // Fake doctor exists
    Doctor.findById.mockResolvedValue({
      _id: "doctor123",

      workingHours: {
        start: "09:00",
        end: "17:00",
      },
    });

    // Fake patient exists
    Patient.findById.mockResolvedValue({
      _id: "patient123",
    });

    // Fake overlap found
    Appointment.findOne.mockResolvedValue({
      _id: "existingAppointment",
    });

    // Expect service to fail
    await expect(
      createAppointmentService({
        doctorId: "doctor123",

        patientId: "patient123",

        start: "2026-05-20T10:00:00",

        end: "2026-05-20T10:30:00",

        reason: "Checkup",
      }),
    ).rejects.toThrow(
      "Doctor already has an appointment during this time slot",
    );
  });

  //second test for successful appointment creation
  test("Should create appointment successfully", async () => {
    Doctor.findById.mockResolvedValue({
      _id: "doctor123",

      workingHours: {
        start: "09:00",
        end: "17:00",
      },
    });

    Patient.findById.mockResolvedValue({
      _id: "patient123",
    });

    // No overlap found
    Appointment.findOne.mockResolvedValue(null);

    Appointment.create.mockResolvedValue({
      _id: "appointment123",

      doctorId: "doctor123",

      patientId: "patient123",
    });

    const result = await createAppointmentService({
      doctorId: "doctor123",

      patientId: "patient123",

      start: "2026-05-20T10:00:00",

      end: "2026-05-20T10:30:00",

      reason: "Checkup",
    });

    expect(result).toHaveProperty("_id");
  });
});
