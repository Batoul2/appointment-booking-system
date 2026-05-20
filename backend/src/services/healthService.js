const mongoose = require("mongoose");

const getHealthStatusService = async () => {
  return {
    status: "Ok",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",

    timestamp: new Date(),
  };
};

module.exports = {
  getHealthStatusService,
};
