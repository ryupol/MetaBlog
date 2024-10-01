import express from "express";
import upload from "../../configs/multer";
import {
  getUserById,
  getUserByToken,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/users.controller";

const router = express.Router();

// router.get("/", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserByToken);
router.get("/:id", getUserById);
router.post("/update", upload.single("profile"), updateUser);
router.post("/logout", logout);

export default router;
