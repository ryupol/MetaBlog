import app from "./app";
import { CLIENT_URL, PORT } from "./configs";
import logger from "./configs/log";

app.listen(PORT, () => {
  logger.info(`✅ Server is running on ${CLIENT_URL}:${PORT}`);
});
