import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL } from "./configs";
import errorHandler from "./errors/errorHandler";
import blogsRouter from "./api/routes/blogs.routes";
import usersRouter from "./api/routes/users.routes";

const app = express();

const corsOptions = {
  credentials: true,
  origin: CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ send: "✨Hello Server!" });
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

export default app;
