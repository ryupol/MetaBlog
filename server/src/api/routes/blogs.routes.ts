import express from "express";
import upload from "../../configs/multer";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogs.controller";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", upload.single("image"), createBlog);
router.post("/update/:id", upload.single("image"), updateBlog);
router.post("/delete/:id", deleteBlog);
router.get("/:id", getBlogById);

export default router;
