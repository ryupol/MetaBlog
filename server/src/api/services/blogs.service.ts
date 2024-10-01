import cloudinary from "../../configs/cloudinary";
import pool from "../../configs/database";
import AppError from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import { BlogCreated } from "../types/blogs.type";

class BlogService {
  async getAll() {
    const result = await pool.query(`
      SELECT b.*, u.name, u.profile_url
      FROM blogs b
      JOIN users u ON b.user_id = u.user_id
  `);
    const blogs = result.rows;
    return blogs;
  }

  async create(blogData: BlogCreated) {
    const query = `
    INSERT INTO blogs (title, image_url, tag, content, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    const uploadResult = await cloudinary.uploader.upload(blogData.image_url);
    const imageUrl = uploadResult.secure_url;
    blogData["image_url"] = imageUrl;
    const values = Object.values(blogData);
    const result = await pool.query(query, values);
    const newBlog = result.rows[0];
    return newBlog;
  }

  async update(blogId: string, newBlog: BlogCreated) {
    const oldBlog = await this.getById(blogId);
    const oldPublicId = oldBlog.image_url.split("/").pop().split(".")[0];
    if (oldBlog.user_id !== newBlog.user_id) {
      throw new AppError(403, errorCodes.FORBIDDEN, "Unauthorized to update this blog");
    }

    const colsToUpdate = [];
    const values = [];

    if (newBlog.title && newBlog.title !== oldBlog.title) {
      colsToUpdate.push("title = $" + (colsToUpdate.length + 1));
      values.push(newBlog.title);
    }
    if (newBlog.tag && newBlog.tag !== oldBlog.tag) {
      colsToUpdate.push("tag = $" + (colsToUpdate.length + 1));
      values.push(newBlog.tag);
    }
    if (newBlog.content && newBlog.content !== oldBlog.content) {
      colsToUpdate.push("content = $" + (colsToUpdate.length + 1));
      values.push(newBlog.content);
    }

    if (
      newBlog.image_url &&
      oldPublicId !== "happy" && // Add default blog Image later on (write date: 10/2/2024)
      oldPublicId !== newBlog.image_url?.split("/")?.pop()?.split(".")?.[0]
    ) {
      const [uploadResult, destroyResult] = await Promise.all([
        cloudinary.uploader.upload(newBlog.image_url),
        oldPublicId !== "happy"
          ? await cloudinary.uploader.destroy(oldPublicId)
          : Promise.resolve("No destroy operation"),
      ]);
      const imageUrl = uploadResult.secure_url;
      newBlog["image_url"] = imageUrl || "";
      colsToUpdate.push("image_url = $" + (colsToUpdate.length + 1));
      values.push(imageUrl);
    }

    if (colsToUpdate.length === 0) {
      throw new AppError(400, errorCodes.FORBIDDEN, "No valid fields to update");
    }

    const setClause = colsToUpdate.join(", ");
    const query = `
    UPDATE blogs
    SET ${setClause}
    WHERE blog_id = $${colsToUpdate.length + 1}
    RETURNING *;
    `;
    values.push(blogId);
    const result = await pool.query(query, values);
    const updatedBlog = result.rows[0];

    if (!updatedBlog) {
      throw new AppError(404, errorCodes.BLOG_NOT_FOUND, "Can't update, blog not found");
    }
    return updatedBlog;
  }

  async delete(blogId: string, userId: string) {
    const oldBlog = await this.getById(blogId);
    if (oldBlog.user_id !== userId) {
      throw new AppError(403, errorCodes.FORBIDDEN, "Unauthorized to delete this blog");
    }
    const oldPublicId = oldBlog.image_url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(oldPublicId);
    const query = `
      DELETE FROM blogs 
      WHERE blog_id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [blogId]);
    const deletedBlog = result.rows[0];
    if (!deletedBlog) {
      throw new AppError(404, errorCodes.BLOG_NOT_FOUND, "Can't delete, blog not found");
    }
    return deletedBlog; // Return the deleted blog data (if needed)
  }

  async getById(blogId: string) {
    const result = await pool.query(
      `
      SELECT b.*, u.name, u.profile_url
      FROM blogs b
      JOIN users u ON b.user_id = u.user_id
      WHERE blog_id = $1
    `,
      [blogId]
    );
    const blog = result.rows[0];
    if (!blog) {
      throw new AppError(404, errorCodes.BLOG_NOT_FOUND, "Blog not found");
    }
    return blog;
  }
}

export default new BlogService();
