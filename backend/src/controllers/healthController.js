const { getHealthStatusService } = require("../services/healthService");

const getHealthStatus = async (req, res, next) => {
  try {
    const healthStatus = await getHealthStatusService();

    res.status(200).json(healthStatus);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHealthStatus,
};
