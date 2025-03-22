// import { NextFunction, Request, Response } from "express";

// export const CatchAsyncError =
//   (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
//     const result = theFunc(req, res, next);
//     if (result instanceof Promise) {
//       result.catch(next);
//     } else {
//       Promise.resolve(result).catch(next);
//     }
//   };


  import { NextFunction, Request, Response } from "express";

export const CatchAsyncError =
  (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };


// export const CatchAsyncError =
//   (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(theFunc(req, res, next)).catch(next);
//   };
