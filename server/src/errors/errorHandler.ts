import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";
import errorCodes from "./errorCodes";
import logger from "../configs/log";

const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const code = error.code || errorCodes.UNKNOWN_ERROR;
  const message = error.message || "Something went wrong";

  logger.error(`${code}[${status}] | ${error}`);

  return res.status(status).json({
    status: "error",
    code: code,
    message: message,
  });
};

export default errorHandler;
