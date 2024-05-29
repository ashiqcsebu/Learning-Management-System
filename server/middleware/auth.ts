import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utilis/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utilis/redis";

//authenticate user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      throw new ErrorHandler("Please Log in to access the Resource", 400);
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Access Token is not valid", 400));
    }

    const user = await redis.get(decoded.id);
    if (!user) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    req.user = JSON.parse(user);
    next();
  }
);

//Validate User Role

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return res.status(403).json({
        success: false,
        message: `Role: ${req.user?.role} is not allowed to access this resource`,
      });
    }

    next();
  };
};

// export const authorizeRoles = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user?.role || '')) {
//       return next(
//         new ErrorHandler(
//           `Role: ${req.user?.role} is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// export const authorizeRoles = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user?.role || "")) {
//       res.status(403).json({
//         success: true,
//         message: `Role: ${req.user?.role} is not allowed to access this resource`,
//       });
//     }

//     next();
//   };
// };
