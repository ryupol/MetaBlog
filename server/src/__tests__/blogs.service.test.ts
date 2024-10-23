import pool from "../configs/database";
import cloudinary from "../configs/cloudinary";
import { AllBlogInfo, BlogCreated, BlogModel } from "../api/types/blogs.type";
import blogService from "../api/services/blogs.service";
import errorCodes from "../errors/errorCodes";

jest.mock("../configs/database");
jest.mock("../configs/cloudinary");

describe("Blog Services", () => {
  const mockBlogId = "1";
  const mockBlogData: BlogCreated = {
    title: "mockTitle",
    image_url: "https://dummyimage.com/300x200/000/fff",
    tag: "mockTag",
    content: "mockContent",
    user_id: "123",
  };
  const mockBlog: BlogModel = { blog_id: mockBlogId, ...mockBlogData };
  const mockOldBlog: BlogModel = {
    blog_id: mockBlogId,
    title: "oldMockTitle",
    image_url: "https://dummyimage.com/150x150/fff/000",
    tag: "oldMockTag",
    content: "oldMockContent",
    user_id: "123",
  };
  const mockBlogInfo: AllBlogInfo = {
    name: "Test1",
    profile_url: "https://dummyimage.com/150x150/fff/000",
    ...mockBlog,
  };
  const mockWrongUserIdBlog = { ...mockOldBlog, user_id: "notFound" };
  const mockUploadResult = {
    secure_url:
      "https://res.cloudinary.com/dxwmjflhh/image/upload/v1720148608/mvhw8pidbeu3qq6wshmi.png",
  };

  beforeEach(jest.clearAllMocks);

  describe("Get all", () => {
    test("should get all blog in database", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockBlogInfo] });
      const blogs = await blogService.getAll();
      expect(blogs).toEqual([mockBlogInfo]);
    });
  });

  describe("Create", () => {
    test("should create a blog", async () => {
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockBlog] });
      const newBlog = await blogService.create(mockBlogData);
      expect(newBlog).toEqual(mockBlog);
    });
  });
  describe("Update", () => {
    test("should update blog", async () => {
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(null);
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockOldBlog] })
        .mockResolvedValueOnce({ rows: [mockBlog] });
      const updatedBlog = await blogService.update(mockBlogId, mockBlogData);
      expect(updatedBlog).toEqual(mockBlog);
    });

    test("should throw AppError if unauthorized", async () => {
      try {
        await blogService.update(mockBlogId, mockWrongUserIdBlog);
      } catch (error: any) {
        expect(error.status).toBe(403);
        expect(error.code).toBe(errorCodes.FORBIDDEN);
      }
    });

    test("should throw AppError if blog not found", async () => {
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockOldBlog] })
        .mockResolvedValueOnce({ rows: [] });
      try {
        await blogService.update(mockBlogId, mockBlogData);
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.code).toBe(errorCodes.BLOG_NOT_FOUND);
      }
    });

    test("should throw AppError if all field is empty", async () => {
      try {
        await blogService.update(mockBlogId, { user_id: "123" });
      } catch (error: any) {
        expect(error.status).toBe(400);
        expect(error.code).toBe(errorCodes.FORBIDDEN);
      }
    });
  });
  describe("Delete", () => {
    test("should delete blog", async () => {
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(mockUploadResult);
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockOldBlog] })
        .mockResolvedValueOnce({ rows: [mockBlog] });
      const deletedBlog = await blogService.delete(mockBlogId, mockBlog.user_id);
      expect(deletedBlog).toEqual(mockBlog);
    });

    test("should throw AppError if unauthorized", async () => {
      try {
        await blogService.delete(mockBlogId, mockWrongUserIdBlog.user_id);
      } catch (error: any) {
        expect(error.status).toBe(403);
        expect(error.code).toBe(errorCodes.FORBIDDEN);
      }
    });

    test("should throw AppError if blog not found", async () => {
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockOldBlog] })
        .mockResolvedValueOnce({ rows: [] });
      try {
        await blogService.delete(mockBlogId, mockBlog.user_id);
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.code).toBe(errorCodes.BLOG_NOT_FOUND);
      }
    });
  });

  describe("Get by Id", () => {
    test("should get blog", async () => {
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockBlogInfo] });
      const newBlog = await blogService.getById(mockBlogId);
      expect(newBlog).toEqual(mockBlogInfo);
    });

    test("should throw AppError if blog_id does not exists", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      try {
        await blogService.getById(mockBlogId);
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.code).toBe(errorCodes.BLOG_NOT_FOUND);
      }
    });
  });
});
