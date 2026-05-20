const Patient = require("../models/Patient");

const createPatientService = async (patientData) => {
  const patient = await Patient.create(patientData);

  return patient;
};

const getPatientsService = async () => {
  const patients = await Patient.find().sort({
    createdAt: -1,
  });

  return patients;
};

module.exports = {
  createPatientService,
  getPatientsService,
};
