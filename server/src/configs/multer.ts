import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    cb(null, false);
    return;
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
