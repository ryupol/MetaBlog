import userService from "../api/services/users.service";
import { UserModel, ValidatePassword } from "../api/types/users.type";
import jwt from "jsonwebtoken";
import pool from "../configs/database";
import AppError from "../errors/AppError";
import errorCodes from "../errors/errorCodes";

jest.mock("jsonwebtoken");
jest.mock("../configs/database");

describe("User Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: UserModel = {
    user_id: "1",
    name: "Testing",
    profile_url: "https://dummyimage.com/300x200/000/fff",
    email: "test@gmail.com",
    password: "$2b$10$KyOAynH.jlZ.NNarRYgNsu9OKGHj.9bzlX42DXDbvANE974zUBSIq",
  };

  describe("Register", () => {
    const validBody = {
      name: "Testing",
      email: "test@gmail.com",
      password: "111",
      passwordConfirm: "111",
    };

    test("should register successfully", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockUser] });
      const newUser = await userService.register(validBody);
      expect(newUser).toBeTruthy();
      expect(newUser.name).toEqual(validBody.name);
      expect(newUser.email).toEqual(validBody.email);
      expect(newUser.profile_url).not.toBeNull();
      expect(newUser.password).toHaveLength(60);
    });

    test("should throw AppError if some fields are missing", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [] });
      const invalidBody = { name: "Testing", email: "test@gmail.com" } as ValidatePassword;
      await expect(userService.register(invalidBody)).rejects.toThrow(AppError);
      try {
        await userService.register(invalidBody);
      } catch (error: any) {
        expect(error.status).toBe(400);
        expect(error.code).toBe(errorCodes.BAD_REQUEST);
      }
    });

    test("should throw AppError if passwords does not match", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [] });
      const invalidBody = { ...validBody, passwordConfirm: "123" };

      await expect(userService.register(invalidBody)).rejects.toThrow(AppError);
      try {
        await userService.register(invalidBody);
      } catch (error: any) {
        expect(error.status).toBe(403);
        expect(error.code).toBe(errorCodes.VALIDATION_ERROR);
      }
    });
  });

  describe("Login", () => {
    const email = "test@gmail.com";
    let password = "123";

    test("should login successfully", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockUser] });
      const user = await userService.login({ email, password });
      expect(user).toStrictEqual(mockUser);
    });

    test("should throw AppError if user not found", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [] });
      await expect(userService.login({ email, password })).rejects.toThrow(AppError);
      try {
        await userService.login({ email, password });
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.code).toBe(errorCodes.USER_NOT_FOUND);
      }
    });

    test("should throw AppError if password does not match", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockUser] });
      password = "wrongPassword";
      await expect(userService.login({ email, password })).rejects.toThrow(AppError);
      try {
        await userService.login({ email, password });
      } catch (error: any) {
        expect(error.status).toBe(403);
        expect(error.code).toBe(errorCodes.FORBIDDEN);
      }
    });
  });

  describe("Token", () => {
    const mockToken = "mockedToken";
    const mockTokenPayload = {
      id: "1",
      email: "test1@gmail.com",
      iat: 1719414506,
      exp: 1719418106,
      iss: "ryupol",
    };

    test("should sign token successfully", async () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);
      const token = await userService.signToken(mockUser);
      expect(token).toEqual(mockToken);
    });

    test("should find user by token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockTokenPayload);
      const user = await userService.findByToken(mockToken);
      expect(user.id).toEqual(mockTokenPayload.id);
      expect(user.email).toEqual(mockTokenPayload.email);
    });

    test("should throw AppError if no token", async () => {
      await expect(userService.findByToken("")).rejects.toThrow(AppError);
      try {
        await userService.findByToken("");
      } catch (error: any) {
        expect(error.status).toBe(401);
        expect(error.code).toBe(errorCodes.UNAUTHORIZED);
      }
    });

    test("should throw AppError if cannot verify token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(null);

      await expect(userService.findByToken(mockToken)).rejects.toThrow(AppError);
      try {
        await userService.findByToken(mockToken);
      } catch (error: any) {
        expect(error.status).toBe(403);
        expect(error.code).toBe(errorCodes.VALIDATION_ERROR);
      }
    });
  });

  describe("ID", () => {
    const mockId = mockUser.user_id;

    test("should find user by id", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockUser] });
      const user = await userService.findById(mockId);
      expect(user).toEqual(mockUser);
    });

    test("should throw AppError if user_id not exists", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [] });
      try {
        await userService.findById(mockId);
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.code).toBe(errorCodes.USER_NOT_FOUND);
      }
    });
  });
});
