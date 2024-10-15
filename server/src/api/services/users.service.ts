import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import pool from "../../configs/database";
import type { UserLogin, UserModel, updateUser, UserRegister } from "../types/users.type";
import { PRIVATE_KEY_BASE64, PUBLIC_KEY_BASE64, JWT_OPTIONS } from "../../configs";
import logger from "../../configs/log";
import cloudinary from "../../configs/cloudinary";

class UserService {
  // Register
  async register(userData: UserRegister) {
    const { email, password, passwordConfirm } = userData;
    if (!email || !password || !passwordConfirm) {
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

    const name = email.split("@")[0];
    const hashed = await bcrypt.hash(password, 10);

    const insertResult = await pool.query(
      `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING user_id, name, email;
      `,
      [name, email, hashed]
    );
    const newUserId = insertResult.rows[0].user_id;
    const selectResult = await pool.query(
      `SELECT user_id, name, email, profile_url FROM users WHERE user_id = $1`,
      [newUserId]
    );
    const newUser = selectResult.rows[0];
    logger.debug(`Register email: ${newUser.email} Successfully`);
    return newUser;
  }

  // HS256 -> Symmetric -> Same key or secret text
  // RS256 -> Asymetric -> 2 keys -> private (sign) / public (varify)
  async signToken(user: UserModel) {
    const { user_id: id, email, name, profile_url } = user;
    const { algorithm, issuer } = JWT_OPTIONS;
    const token = jwt.sign({ id, email, name, profile_url }, PRIVATE_KEY_BASE64, {
      expiresIn: "1h",
      algorithm,
      issuer,
    } as jwt.SignOptions);
    logger.debug(`Using ${algorithm} algorithm to sign token: ${token.substring(0, 8)}...`);
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

  async update(authToken: string, newUser: updateUser) {
    const oldUser = await this.findByToken(authToken);
    const oldPublicId = oldUser.profile_url.split("/").pop().split(".")[0];

    const colsToUpdate = [];
    const values = [];

    if (newUser.name && newUser.name !== oldUser.name) {
      colsToUpdate.push("name = $" + (colsToUpdate.length + 1));
      values.push(newUser.name);
    }

    if (newUser.email && newUser.email !== oldUser.email) {
      colsToUpdate.push("email = $" + (colsToUpdate.length + 1));
      values.push(newUser.email);
    }

    if (
      newUser.profile_url &&
      oldPublicId !== newUser.profile_url?.split("/")?.pop()?.split(".")?.[0]
    ) {
      const [uploadResult, destroyResult] = await Promise.all([
        await cloudinary.uploader.upload(newUser.profile_url),
        oldPublicId !== "happy"
          ? await cloudinary.uploader.destroy(oldPublicId)
          : Promise.resolve("No destroy operation"),
      ]);
      const profileUrl = uploadResult.secure_url;
      newUser["profile_url"] = profileUrl || "";
      colsToUpdate.push("profile_url = $" + (colsToUpdate.length + 1));
      values.push(profileUrl);
    }

    if (colsToUpdate.length === 0) {
      throw new AppError(400, errorCodes.FORBIDDEN, "No valid fields to update");
    }

    const setClause = colsToUpdate.join(", ");
    const query = `
      UPDATE users
      SET ${setClause}
      WHERE user_id = $${colsToUpdate.length + 1}
      RETURNING *;
    `;

    values.push(oldUser.id);

    const result = await pool.query(query, values);
    const updatedUser = result.rows[0];

    if (!updatedUser) {
      throw new AppError(404, errorCodes.USER_NOT_FOUND, "Can't update, user not found");
    }

    return updatedUser;
  }
}

export default new UserService();
