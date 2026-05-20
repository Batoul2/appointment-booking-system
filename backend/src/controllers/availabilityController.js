const { getAvailabilityService } = require("../services/availabilityService");

const getAvailability = async (req, res, next) => {
  try {
    const slots = await getAvailabilityService(req.query);

    res.status(200).json(slots);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAvailability,
};
