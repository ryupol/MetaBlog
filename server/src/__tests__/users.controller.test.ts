import request from "supertest";
import app from "../app";
import userService from "../api/services/users.service";
import AppError from "../errors/AppError";
import errorCodes from "../errors/errorCodes";
import { UserModel } from "../api/types/users.type";

jest.mock("../api/services/users.service");

describe("User Controller", () => {
  const cookieName: string = "token";
  const mockToken: string = "mockedToken";
  const mockUser: UserModel = {
    user_id: "1",
    name: "Testing",
    profile_url: "https://dummyimage.com/300x200/000/fff",
    email: "test@gmail.com",
    password: "$2b$10$KyOAynH.jlZ.NNarRYgNsu9OKGHj.9bzlX42DXDbvANE974zUBSIq",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users/register", () => {
    test("should return new user data", async () => {
      (userService.register as jest.Mock).mockReturnValue(mockUser);

      const response = await request(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@gmail.com",
        password: "111",
        passwordConfirm: "111",
      });

      expect(response.status).toEqual(201);
      expect(response.body.message).not.toBeNull();
    });

    test("should handle error if some field are missing", async () => {
      (userService.register as jest.Mock).mockImplementation(() => {
        throw new AppError(400, errorCodes.BAD_REQUEST, "All fields are required");
      });

      const response = await request(app)
        .post("/api/users/register")
        .send({ name: "Testing" });

      expect(response.status).toEqual(400);
      expect(response.body.code).toEqual(errorCodes.BAD_REQUEST);
    });

    test("should handle error if email is dupplicated", async () => {
      (userService.register as jest.Mock).mockImplementation(() => {
        throw new AppError(
          409,
          errorCodes.UNIQUE_CONSTRAINT_VIOLATION,
          "The provided email is already taken"
        );
      });

      const response = await request(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@gmail.com",
        password: "111",
        passwordConfirm: "111",
      });

      expect(response.status).toEqual(409);
      expect(response.body.code).toEqual(errorCodes.UNIQUE_CONSTRAINT_VIOLATION);
    });
  });

  describe("POST /api/users/login", () => {
    test("should return login success message", async () => {
      (userService.login as jest.Mock).mockReturnValue(mockUser);
      (userService.signToken as jest.Mock).mockReturnValue(mockToken);

      const response = await request(app)
        .post("/api/users/login")
        .send({ email: "test@gmail.com", password: "123" });

      expect(response.status).toEqual(200);
      expect(response.headers["set-cookie"][0]).toContain(`${cookieName}=${mockToken}`);
    });

    test("should handle error if wrong password", async () => {
      (userService.login as jest.Mock).mockImplementation(() => {
        throw new AppError(
          400,
          errorCodes.BAD_REQUEST,
          "Login fail (wrong email or password)"
        );
      });
      (userService.signToken as jest.Mock).mockReturnValue(mockToken);

      const response = await request(app)
        .post("/api/users/login")
        .send({ email: "test@gmail.com", password: "wrongPassword" });

      expect(response.status).toEqual(400);
      expect(response.body.code).toEqual(errorCodes.BAD_REQUEST);
    });
  });

  describe("GET /api/users/me", () => {
    test("should get user data", async () => {
      (userService.findByToken as jest.Mock).mockReturnValue(mockUser);

      const response = await request(app)
        .get("/api/users/me")
        .set("Cookie", [`${cookieName}=${mockToken}`]);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(mockUser);
    });

    test("should handle error if token is missing", async () => {
      (userService.findByToken as jest.Mock).mockImplementation(() => {
        throw new AppError(401, errorCodes.UNAUTHORIZED, "User did not login yet");
      });

      const response = await request(app)
        .get("/api/users/me")
        .set("Cookie", [`${cookieName}=${mockToken}`]);
      console.log(response.body.message);
      expect(response.status).toEqual(401);
      expect(response.body.code).toEqual(errorCodes.UNAUTHORIZED);
    });
  });

  describe("GET /api/users/:id", () => {
    const mockId = mockUser.user_id;

    test("should get user data", async () => {
      (userService.findById as jest.Mock).mockReturnValue(mockUser);

      const response = await request(app).get(`/api/users/${mockId}`);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(mockUser);
    });

    test("should return 400 if ID is not exists", async () => {
      (userService.findById as jest.Mock).mockImplementation(() => {
        throw new AppError(404, errorCodes.USER_NOT_FOUND, "User not found");
      });

      const response = await request(app).get(`/api/users/${mockId}`);

      expect(response.status).toEqual(404);
      expect(response.body.code).toEqual(errorCodes.USER_NOT_FOUND);
    });
  });

  describe("POST /api/users/update", () => {
    const mockNewToken: string = "mockedNewToken";
    const mockNewUser: UserModel = {
      user_id: "1",
      name: "New Testing",
      profile_url: "https://dummyimage.com/300x200/000/fff",
      email: "new_test@gmail.com",
      password: "$2b$10$KyOAynH.jlZ.NNarRYgNsu9OKGHj.9bzlX42DXDbvANE974zUBSIq",
    };
    const buffer = Buffer.from("mock image data");

    test("should return 200 and updated user data", async () => {
      (userService.update as jest.Mock).mockResolvedValue(mockNewUser);
      (userService.signToken as jest.Mock).mockResolvedValue(mockNewToken);

      const response = await request(app)
        .post("/api/users/update")
        .field("name", mockNewUser.name)
        .field("email", mockNewUser.email)
        .attach("profile", buffer, "profile.jpg")
        .set("Cookie", [`${cookieName}=${mockToken}`]);

      expect(response.status).toEqual(200);
      expect(response.body.message).not.toBeNull();
    });

    test("should return 400 if file not an image", async () => {
      const response = await request(app)
        .post("/api/users/update")
        .field("name", mockNewUser.name)
        .field("email", mockNewUser.email)
        .attach("profile", buffer, "profile.txt")
        .set("Cookie", [`${cookieName}=${mockToken}`]);

      expect(response.status).toEqual(400);
      expect(response.body.code).toEqual(errorCodes.BAD_REQUEST);
    });
  });

  describe("POST /api/users/logout", () => {
    test("should clear cookie and return success message", async () => {
      const response = await request(app)
        .post("/api/users/logout")
        .set("Cookie", [`${cookieName}=${mockToken}`]);

      expect(response.status).toEqual(200);
      expect(response.body.message).not.toBeNull();
      expect(response.headers["set-cookie"][0]).toContain(`${cookieName}=;`);
    });

    test("should handle error if there is no token", async () => {
      const response = await request(app).post("/api/users/logout");

      expect(response.status).toEqual(401);
      expect(response.body.code).toEqual(errorCodes.UNAUTHORIZED);
    });
  });
});
