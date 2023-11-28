import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/error";

export const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working perfectly",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} is not Found`) as any;
  err.statusCode(404);
  next(err);
});

app.use(ErrorMiddleware)
