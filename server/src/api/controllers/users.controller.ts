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
    const token = await userService.signToken(newUser);
    res.cookie(JWT_OPTIONS.jwtCookieName, token, {
      maxAge: 3600000, // cookie expire in 1 hour
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    logger.debug(`Create User Email: "${newUser.email}"  successful.`);
    return res.status(201).json({ message: `Register Success` });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
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
    logger.debug(`get User with Token: ${authToken.substring(0, 8)}...`);
    const user = await userService.findByToken(authToken);
    logger.debug(`[Token] Get user: "${user.email}" successful.`);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id: string = req.params.id;
    const user = await userService.findById(user_id);
    logger.debug(`[ID] Get email: "${user.email}" successful.`);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!req.file || !req.file.mimetype.startsWith("image/")) {
      throw new AppError(400, errorCodes.BAD_REQUEST, "Can't upload file that is not image.");
    }
    const profile_url = req.file.path;

    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];

    const newUserData = { name, email, profile_url };
    logger.debug(`Start updating user token: ${authToken.substring(0, 8)}...`);
    const updatedUser = await userService.update(authToken, newUserData);
    const newToken = await userService.signToken(updatedUser);
    res.cookie(JWT_OPTIONS.jwtCookieName, newToken, {
      maxAge: 3600000, // cookie expire in 1 hour
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    logger.debug(`Updated user ID: "${updatedUser.user_id}" successful`);
    res.status(200).json({ message: "Updated user successful" });
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
    logger.debug(`Clearing token: ${authToken.substring(0, 8)}... success`);
    return res.clearCookie(token).json({
      message: "You have logged out!",
    });
  } catch (error) {
    next(error);
  }
};
