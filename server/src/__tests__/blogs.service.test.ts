import pool from "../configs/database";
import cloudinary from "../configs/cloudinary";
import { BlogCreated, BlogModel } from "../api/types/blogs.type";
import blogService from "../api/services/blogs.service";
import errorCodes from "../errors/errorCodes";

jest.mock("../configs/database");
jest.mock("../configs/cloudinary");

describe("Blog Services", () => {
  const mockBlogId = "1";
  const mockBlogData: BlogCreated = {
    title: "mockTitle",
    image_url: "https://dummyimage.com/300x200/000/fff",
    description: "mockDescription",
    content: "mockContent",
    user_id: "123",
  };
  const mockBlog: BlogModel = { blog_id: mockBlogId, ...mockBlogData };
  const mockOldBlog: BlogModel = {
    blog_id: mockBlogId,
    title: "oldMockTitle",
    image_url: "https://dummyimage.com/150x150/fff/000",
    description: "oldMockDescription",
    content: "oldMockContent",
    user_id: "123",
  };
  const mockWrongUserIdBlog = { ...mockOldBlog, user_id: "notFound" };

  beforeEach(jest.clearAllMocks);

  describe("Get all", () => {
    test("should get all blog in database", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockBlog] });
      const blogs = await blogService.getAll();
      expect(blogs).toEqual([mockBlog]);
    });
  });

  describe("Create", () => {
    test("should create a blog", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockBlog] });
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(null);
      const newBlog = await blogService.create(mockBlogData);
      expect(newBlog).toEqual(mockBlog);
    });
  });
  describe("Update", () => {
    test("should update blog", async () => {
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockOldBlog] })
        .mockResolvedValueOnce({ rows: [mockBlog] });
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(null);
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(null);
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
  });
  describe("Delete", () => {
    test("should delete blog", async () => {
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockOldBlog] })
        .mockResolvedValueOnce({ rows: [mockBlog] });
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(null);
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
      (pool.query as jest.Mock).mockReturnValue({ rows: [mockBlog] });
      const newBlog = await blogService.getById(mockBlogId);
      expect(newBlog).toEqual(mockBlog);
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
