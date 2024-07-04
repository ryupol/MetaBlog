import express from "express";
import {
  getUserById,
  getUserByToken,
  login,
  logout,
  register,
} from "../controllers/users.controller";

const router = express.Router();

// router.get("/", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserByToken);
router.get("/:id", getUserById);
router.post("/logout", logout);

export default router;
