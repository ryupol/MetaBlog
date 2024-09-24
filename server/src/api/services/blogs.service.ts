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

  async update(blogId: string, blog: BlogCreated) {
    const oldBlog = await this.getById(blogId);
    if (oldBlog.user_id !== blog.user_id) {
      throw new AppError(403, errorCodes.FORBIDDEN, "Unauthorized to update this blog");
    }
    const oldPublicId = oldBlog.image_url.split("/").pop().split(".")[0];
    const [uploadResult, destroyResult] = await Promise.all([
      cloudinary.uploader.upload(blog.image_url),
      cloudinary.uploader.destroy(oldPublicId),
    ]);
    const imageUrl = uploadResult.secure_url;
    blog["image_url"] = imageUrl;

    const colsToUpdate = Object.keys(blog);
    const setClause = colsToUpdate.map((col, index) => `${col} = $${index + 1}`).join(", ");
    const query = `
      UPDATE blogs
      SET ${setClause}
      WHERE blog_id = $${colsToUpdate.length + 1}
      RETURNING *;
    `;
    colsToUpdate.push(blogId);
    const values = Object.values(blog);
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
