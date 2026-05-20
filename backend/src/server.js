require("dotenv").config();
const logger = require("./utils/logger");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
