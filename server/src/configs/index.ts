import dotenv from "dotenv";
dotenv.config();

const APP_NAME = "Blogna";
const BASE_PATH = process.cwd();
const LOG_SAVE_LEVEL = process.env.LOG_SAVE_LEVEL || "debug";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_USER = process.env.POSTGRES_USER || "root";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "123";
const DB_NAME = process.env.DB_NAME || "blogna";

const PRIVATE_KEY_BASE64 = process.env.PRIVATE_KEY_BASE64 || "mysecret";
const PUBLIC_KEY_BASE64 = process.env.PRIVATE_KEY_BASE64 || "mysecret";

const ALGORITHM = process.env.PRIVATE_KEY_BASE64 ? "RS256" : "HS256";

const JWT_OPTIONS = {
  algorithm: ALGORITHM,
  issuer: "ryupol",
  jwtCookieName: "token",
};

const NODE_ENV = process.env.NODE_ENV || "dev";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

export {
  APP_NAME,
  BASE_PATH,
  LOG_SAVE_LEVEL,
  CLIENT_URL,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DB_NAME,
  PRIVATE_KEY_BASE64,
  PUBLIC_KEY_BASE64,
  JWT_OPTIONS,
  NODE_ENV,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
};
