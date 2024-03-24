require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(ErrorMiddleware);
app.use(cors({ origin: process.env.ORIGIN }));


app.use("/api/v1",userRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working.",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;
  next(err);
});
