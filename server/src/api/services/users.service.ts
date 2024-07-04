import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import pool from "../../configs/database";
import type { ValidatePassword, UserLogin, UserModel } from "../types/users.type";
import { PRIVATE_KEY_BASE64, PUBLIC_KEY_BASE64, JWT_OPTIONS } from "../../configs";
import logger from "../../configs/log";

class UserService {
  // Register
  async register(userData: ValidatePassword) {
    const { name, email, password, passwordConfirm } = userData;
    if (!name || !email || !password || !passwordConfirm) {
      throw new AppError(400, errorCodes.BAD_REQUEST, "All field are required");
    }
    logger.debug(`Registering email: ${email}`);

    if (password !== passwordConfirm) {
      throw new AppError(
        403,
        errorCodes.VALIDATION_ERROR,
        "Fail to register password does not matched"
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING user_id, name, profile_url, email;
      `,
      [name, email, hashed]
    );
    const newUser = result.rows[0];
    logger.debug(`Register email: ${newUser.email} Successfully`);
    return newUser;
  }

  // HS256 -> Symmetric -> Same key or secret text
  // RS256 -> Asymetric -> 2 keys -> private (sign) / public (varify)
  async signToken(user: UserModel) {
    const { user_id: id, email } = user;
    const { algorithm, issuer } = JWT_OPTIONS;
    const token = jwt.sign({ id, email }, PRIVATE_KEY_BASE64, {
      expiresIn: "1h",
      algorithm,
      issuer,
    } as jwt.SignOptions);
    logger.debug(`Using ${algorithm} algorithm to sign token: ${token}`);
    return token;
  }

  // Login
  async login({ email, password }: UserLogin) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
      throw new AppError(404, errorCodes.USER_NOT_FOUND, `Email: ${email} doesn't exists`);
    }
    const match: boolean = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError(403, errorCodes.FORBIDDEN, "Login fail (wrong email or password)");
    }
    return user;
  }

  async findByToken(authToken: string) {
    if (!authToken) {
      throw new AppError(401, errorCodes.UNAUTHORIZED, "User did not login yet");
    }
    const user = jwt.verify(authToken, PUBLIC_KEY_BASE64);
    if (!user || typeof user === "string") {
      throw new AppError(403, errorCodes.VALIDATION_ERROR, `Cannot get user`);
    }
    return user;
  }

  async findById(userId: string) {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    const user = result.rows[0];
    if (!user) {
      throw new AppError(404, errorCodes.USER_NOT_FOUND, "User not found");
    }
    return user;
  }
}

export default new UserService();
