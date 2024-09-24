import { NextFunction, Request, Response } from "express";
import userService from "../services/users.service";
import { JWT_OPTIONS } from "../../configs";
import AppError from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import logger from "../../configs/log";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    logger.debug("Start Creating user.");
    const newUser = await userService.register(userData);
    const { user_id: userId, name } = newUser;
    logger.debug(`User: "${name}" created successfully.`);
    return res.status(201).json({ userId, name });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    console.log(userData);
    logger.debug(`Starting login with email: ${userData.email}`);
    const user = await userService.login(userData);
    const token = await userService.signToken(user);
    res.cookie(JWT_OPTIONS.jwtCookieName, token, {
      maxAge: 3600000, // cookie expire in 1 hour
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    logger.debug(`Login with email: ${user.email} successful.`);
    return res.status(200).json({ message: `Login Success` });
  } catch (error) {
    next(error);
  }
};

export const getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    logger.debug("AuthToken:", authToken);
    const user = await userService.findByToken(authToken);
    logger.debug(`[Token] Get email: "${user.email}" successful.`);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const user = await userService.findById(userId);
    logger.debug(`[ID] Get email: "${user.email}" successful.`);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    if (!authToken) {
      logger.error(`Token not found`);
      throw new AppError(401, errorCodes.UNAUTHORIZED, `Unauthorized`);
    }
    logger.debug(`Clearing token: ${authToken} success`);
    return res.clearCookie(token).json({
      message: "You have logged out!",
    });
  } catch (error) {
    next(error);
  }
};
