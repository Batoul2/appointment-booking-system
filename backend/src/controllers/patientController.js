const {
  createPatientService,
  getPatientsService,
} = require("../services/patientService");

const createPatient = async (req, res, next) => {
  try {
    const patient = await createPatientService(req.body);

    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

const getPatients = async (req, res, next) => {
  try {
    const patients = await getPatientsService();

    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
  getPatients,
};
