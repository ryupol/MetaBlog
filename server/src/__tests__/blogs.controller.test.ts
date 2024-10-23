import request from "supertest";
import app from "../app";
import blogService from "../api/services/blogs.service";
import userService from "../api/services/users.service";
import { BlogData, BlogModel } from "../api/types/blogs.type";
import AppError from "../errors/AppError";
import errorCodes from "../errors/errorCodes";

jest.mock("../api/services/blogs.service");
jest.mock("../api/services/users.service");

describe("Blog Controller", () => {
  const mockBlogData: BlogData = {
    title: "mockTitle",
    tag: "mockTag",
    content: "mockContent",
  };

  const mockBlog: BlogModel = {
    blog_id: "1",
    image_url: "https://dummyimage.com/300x200/000/fff",
    user_id: "123",
    ...mockBlogData,
  };

  const mockTokenPayload = {
    id: "123",
    email: "test123@gmail.com",
    iat: 1719414506,
    exp: 1719418106,
    iss: "ryupol",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/blogs", () => {
    test("should get all and return status 200", async () => {
      (blogService.getAll as jest.Mock).mockResolvedValue([mockBlog]);
      const response = await request(app).get("/api/blogs");
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ data: [mockBlog] });
    });
  });

  describe("POST /api/blogs/create", () => {
    const buffer = Buffer.alloc(300 * 200 * 10, ".");

    test("should create and return status 201", async () => {
      (blogService.create as jest.Mock).mockResolvedValue(mockBlog);
      (userService.findByToken as jest.Mock).mockResolvedValue(mockTokenPayload);
      const response = await request(app)
        .post("/api/blogs/create")
        .field("title", mockBlogData.title)
        .field("tag", mockBlogData.tag)
        .field("content", mockBlogData.content)
        .attach("image", buffer, "image.jpg");
      expect(response.body).toEqual(mockBlog);
      expect(response.status).toEqual(201);
    });

    test("should return 400 if file not an image", async () => {
      const response = await request(app)
        .post("/api/blogs/create")
        .field("title", mockBlogData.title)
        .field("tag", mockBlogData.tag)
        .field("content", mockBlogData.content)
        .attach("image", buffer, "fakeimage.txt");
      expect(response.status).toEqual(400);
      expect(response.body.code).toEqual(errorCodes.BAD_REQUEST);
    });
  });

  describe("POST /api/blogs/update/:id", () => {
    const buffer = Buffer.from("mock image data");
    test("should update and return status 200", async () => {
      (blogService.update as jest.Mock).mockResolvedValue(mockBlog);
      (userService.findByToken as jest.Mock).mockResolvedValue(mockTokenPayload);
      const response = await request(app)
        .post(`/api/blogs/update/${mockBlog.blog_id}`)
        .field("title", mockBlogData.title)
        .field("tag", mockBlogData.tag)
        .field("content", mockBlogData.content)
        .attach("image", buffer, "image.jpg");
      expect(response.body.message).not.toBeNull();
      expect(response.status).toEqual(200);
    });

    test("should return 400 if file not an image", async () => {
      const response = await request(app)
        .post(`/api/blogs/update/${mockBlog.blog_id}`)
        .field("title", mockBlogData.title)
        .field("tag", mockBlogData.tag)
        .field("content", mockBlogData.content)
        .attach("image", buffer, "fakeimage.txt");
      expect(response.status).toEqual(400);
      expect(response.body.code).toEqual(errorCodes.BAD_REQUEST);
    });
  });

  describe("POST /api/blogs/delete/:id", () => {
    test("should delete and return status 200", async () => {
      (blogService.delete as jest.Mock).mockResolvedValue(null);
      (userService.findByToken as jest.Mock).mockResolvedValue(mockTokenPayload);
      const response = await request(app).post(`/api/blogs/delete/${mockBlog.blog_id}`);
      expect(response.status).toEqual(204);
    });

    test("should return error", async () => {
      (blogService.delete as jest.Mock).mockImplementation(() => {
        throw new AppError(403, errorCodes.FORBIDDEN, "Unauthorized to delete this blog");
      });
      const response = await request(app).post(`/api/blogs/delete/${mockBlog.blog_id}`);
      expect(response.status).toEqual(403);
      expect(response.body.code).toEqual(errorCodes.FORBIDDEN);
    });
  });

  describe("GET /api/blogs/:id", () => {
    const mockId = "1";

    test("should get a blog", async () => {
      (blogService.getById as jest.Mock).mockResolvedValue(mockBlog);
      const response = await request(app).get(`/api/blogs/${mockId}`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(mockBlog);
    });

    test("should return 404 if blog_id not exists", async () => {
      (blogService.getById as jest.Mock).mockImplementation(() => {
        throw new AppError(404, errorCodes.BLOG_NOT_FOUND, "Blog not found");
      });
      const response = await request(app).get(`/api/blogs/${mockId}`);
      expect(response.status).toEqual(404);
      expect(response.body.code).toEqual(errorCodes.BLOG_NOT_FOUND);
    });
  });
});
