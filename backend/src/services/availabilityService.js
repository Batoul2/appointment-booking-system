const dayjs = require("dayjs");
const Doctor = require("../models/Doctor");

const Appointment = require("../models/Appointment");

const getAvailabilityService = async ({ doctorId, date }) => {
  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }
  //start and end of the day
  const startOfDay = dayjs(date)
    .hour(Number(doctor.workingHours.start.split(":")[0]))
    .minute(0)
    .second(0);

  const endOfDay = dayjs(date)
    .hour(Number(doctor.workingHours.end.split(":")[0]))
    .minute(0)
    .second(0);

  //this is to get all the appointments for the doctor on the given date
  const appointments = await Appointment.find({
    doctorId,
    status: "Booked",

    start: {
      $gte: startOfDay.toDate(),
    },

    end: {
      $lte: endOfDay.toDate(),
    },
  });

  const slots = [];

  let currentSlot = startOfDay;
  //this while loop will generate for us the time slots with 30 min interval between 9 and 5
  while (currentSlot.isBefore(endOfDay)) {
    slots.push(currentSlot.format("HH:mm"));

    currentSlot = currentSlot.add(30, "minute");
  }

  // after booking we remove the booked slots from the available slots
  const availableSlots = slots.filter((slot) => {
    const slotTime = dayjs(`${date} ${slot}`);

    const isBooked = appointments.some((appointment) => {
      const appointmentStart = dayjs(appointment.start);

      return appointmentStart.format("HH:mm") === slotTime.format("HH:mm");
    });

    return !isBooked;
  });

  return availableSlots;
};

module.exports = {
  getAvailabilityService,
};
