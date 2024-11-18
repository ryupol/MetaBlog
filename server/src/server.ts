import app from "./app";
import { CLIENT_URL } from "./configs";
import logger from "./configs/log";

const PORT = 8000;
app.listen(PORT, () => {
  logger.info(`✅ Server is running on ${CLIENT_URL}:${PORT}`);
});
