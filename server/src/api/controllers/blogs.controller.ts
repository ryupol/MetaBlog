import { NextFunction, Request, Response } from "express";
import isImage from "is-image";
import blogService from "../services/blogs.service";
import AppError from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import userService from "../services/users.service";
import { JWT_OPTIONS } from "../../configs";
import logger from "../../configs/log";

export const getAllBlogs = async (req: Request, res: Response) => {
  logger.debug("Start getting blogs");
  const blogs = await blogService.getAll();
  logger.debug("Getting all blogs success");
  res.status(200).json({ data: blogs });
};

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, tag, content } = req.body;
    logger.debug(`Start creating blog: "${title}"`);
    if (!req.file) {
      throw new AppError(400, errorCodes.BAD_REQUEST, "Image is required");
    }
    const image_url = req.file.path;
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    const user = await userService.findByToken(authToken);

    const { id: user_id } = user;
    const blogData = { title, image_url, tag, content, user_id };
    const newBlog = await blogService.create(blogData);
    logger.debug(`Blog "${newBlog.title}" created successfully.`);
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;
    const { title, tag, content } = req.body;

    if (!req.file || !req.file.mimetype.startsWith("image/")) {
      throw new AppError(400, errorCodes.BAD_REQUEST, "Can't upload file that is not image.");
    }
    const image_url = req.file.path;

    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    logger.debug(`Start updating blog: ${title}`);
    const user = await userService.findByToken(authToken);

    const { id: user_id } = user;
    const newBlogData = { title, image_url, tag, content, user_id };
    logger.debug(`[Update] Blog id: ${blogId}`);
    const updatedBlog = await blogService.update(blogId, newBlogData);
    logger.debug(`Updated blog: "${updatedBlog.title}" successful`);
    res.status(200).json({ message: "Updated blog successful" });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.debug("Start deleting blog");
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    const user = await userService.findByToken(authToken);
    const { id: userId } = user;
    const blogId = req.params.id;
    await blogService.delete(blogId, userId);
    logger.debug("Done deleting blog");
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  // Get by query
  try {
    const blogId = req.params.id;
    const blog = await blogService.getById(blogId);
    logger.debug(`[ID] Get blog: ${blog.blog_id}`);
    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
