const Doctor = require("../models/Doctor");

const createDoctorService = async (doctorData) => {
  const doctor = await Doctor.create(doctorData);

  return doctor;
  
};

const getDoctorsService = async () => {
  const doctors = await Doctor.find().sort({
     createdAt: -1,
    });

  return doctors;
}

module.exports = {
  createDoctorService,
  getDoctorsService,
};