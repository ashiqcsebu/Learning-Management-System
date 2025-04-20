require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(ErrorMiddleware);
//app.use(cors({ origin: process.env.ORIGIN }));


app.use(
  cors({
    origin: "http://localhost:3000",
   credentials: true, // Allow cookies to be sent from client
   // methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  })
);

app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);



// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/courses", courseRouter);
// app.use("/api/v1/orders", orderRouter);
// app.use("/api/v1/notifications", notificationRouter);
// app.use("/api/v1/analytics", analyticsRouter);
// app.use("/api/v1/layouts", layoutRouter);

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
