const {
  createDoctorService,
  getDoctorsService,
} = require("../services/doctorService");

const createDoctor = async (req, res, next) => {
  try {
    const doctor = await createDoctorService(req.body);

    res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
};

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await getDoctorsService();

    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDoctor,
  getDoctors,
};
