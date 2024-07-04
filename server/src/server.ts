import app from "./app";
import logger from "./configs/log";

const PORT = 8000;
app.listen(PORT, () => {
  logger.info(`✅ Server is running on http://localhost:${PORT}`);
});
