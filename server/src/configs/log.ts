import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { LOG_SAVE_LEVEL, BASE_PATH, APP_NAME } from ".";

const { combine, json, timestamp } = winston.format;
const LOG_DIRECTORY = `${BASE_PATH}/logs`;

const defaultFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  json()
);

// --- Custom Format ---
const myFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
  })
);

function generateRotateConfig(level: string) {
  let filename = `${LOG_DIRECTORY}/${APP_NAME}-%DATE%.log`;
  if (level === "error") {
    filename = `${LOG_DIRECTORY}/${APP_NAME}-error-%DATE%.log`;
  }

  return new DailyRotateFile({
    filename,
    datePattern: "YYYY-MM-DD",
    frequency: "1m", // 1 minute
    maxSize: "10m", // 10mb
    level,
  });
}

const logger = winston.createLogger({
  level: LOG_SAVE_LEVEL,
  format: myFormat,
  defaultMeta: { service: APP_NAME },
  transports: [generateRotateConfig(LOG_SAVE_LEVEL), generateRotateConfig("error")],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: myFormat,
    })
  );
}

export default logger;
