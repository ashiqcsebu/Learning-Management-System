import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utilis/ErrorHandler";
import notificationModel from "../models/notification.model";
import cron from "node-cron";

export const getNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler((error as Error).message, 500));
    }
  }
);

export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not Found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }
      await notification.save();

      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler((error as Error).message, 500));
    }
  }
);

// delete notifications= only for admin

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const notifications = await notificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Delete read Notification");
});
