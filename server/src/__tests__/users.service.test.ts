import userService from "../api/services/users.service";
import { UserModel, ValidatePassword } from "../api/types/users.type";
import jwt from "jsonwebtoken";
import pool from "../configs/database";
import AppError from "../errors/AppError";
import errorCodes from "../errors/errorCodes";
import cloudinary from "../configs/cloudinary";

jest.mock("jsonwebtoken");
jest.mock("../configs/database");
jest.mock("../configs/cloudinary");

describe("User Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockToken = "mockedToken";
  const mockUser: UserModel = {
    user_id: "1",
    name: "Tester",
    profile_url: "path_to_image_file/new_profile_image.png",
    email: "test@gmail.com",
    password: "$2b$10$KyOAynH.jlZ.NNarRYgNsu9OKGHj.9bzlX42DXDbvANE974zUBSIq",
  };
  const mockTokenPayload = {
    id: "1",
    email: "test@gmail.com",
    name: "Tester",
    profile_url:
      "https://res.cloudinary.com/dxwmjflhh/image/upload/v1720148608/mvhw8pidbeu3qq6wshmi.png",
    iat: 1719414506,
    exp: 1719418106,
    iss: "ryupol",
  };

  describe("Register", () => {
    const validBody = {
      name: "Tester",
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

  describe("Update", () => {
    const mockProfileResult = {
      secure_url: mockTokenPayload.profile_url,
    };
    const mockNewUser: UserModel = {
      user_id: "1",
      name: "new Tester",
      profile_url: "path_to_image_file/new_profile_image.png",
      email: "test_new@gmail.com",
      password: "$2b$10$KyOAynH.jlZ.NNarRYgNsu9OKGHj.9bzlX42DXDbvANE974zUBSIq",
    };

    const mockNewUserData = {
      name: mockNewUser.name,
      email: mockNewUser.email,
      profile_url: mockNewUser.profile_url,
    };

    test("should update user successfully", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockTokenPayload);
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockProfileResult);
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(null);
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockNewUser] });

      const user = await userService.update(mockToken, mockNewUserData);
      expect(user).toEqual(mockNewUser);
    });

    test("should throw AppError if all field is empty", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockTokenPayload);

      try {
        await userService.update(mockToken, {});
      } catch (error: any) {
        expect(error.status).toBe(400);
        expect(error.code).toBe(errorCodes.FORBIDDEN);
      }
    });
    test("should throw AppError if user not found", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockTokenPayload);
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockProfileResult);
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(null);
      (pool.query as jest.Mock).mockReturnValue({ rows: [] });
      try {
        await userService.update(mockToken, mockNewUserData);
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.code).toBe(errorCodes.USER_NOT_FOUND);
      }
    });
  });
});
