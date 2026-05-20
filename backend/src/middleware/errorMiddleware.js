const logger = require("../utils/logger");

const errorMiddleware = (error, req, res, next) => {
  logger.error(`[${req.requestId}] ${error.message}`);

  res.status(500).json({
    message: error.message || "Server Error",
    requestId: req.requestId,
    timestamp: new Date(),
  });
};

module.exports = errorMiddleware;
