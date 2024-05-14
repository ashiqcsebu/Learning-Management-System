import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utilis/ErrorHandler";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import { newOrder } from "../services/order.service";
import ejs from "ejs";
import path from "path";
import sendMail from "../utilis/sendMail";
import notificationModel from "../models/notification.model";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);
      const isCourseAlreadyPurchased = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      if (isCourseAlreadyPurchased) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }
      const course = await courseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course Not Found", 500));
      }
      const data: any = {
        courseId: course?._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler((error as Error).message, 500));
      }

      user?.courses.push(course?._id);
      await user?.save();

      await notificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have new order course name: ${course?.name}`,
      });
      //   if (course.purchased) {
      //     course.purchased += 1;
      //   }
      await courseModel.findByIdAndUpdate(courseId, {
        $inc: { purchased: 1 },
      });

      await course?.save();
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler((error as Error).message, 500));
    }
  }
);
