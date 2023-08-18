import { NextFunction, Request, Response, Router } from "express";
import { HttpError } from "../errors";
const METHODS = ["get", "post", "delete", "put", "patch"];

type AsyncHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// Error handler middleware for async controller
export const asyncHandler =
  (fn: AsyncHandlerType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export function toAsyncRouter(): Router {
  let router = Router();
  for (let key in router) {
    if (METHODS.includes(key)) {
      let method = router[key];
      router[key] = (path: string, ...callbacks) => {
        method.call(router, path, ...callbacks.map((cb) => asyncHandler(cb)));
      };
    }
  }
  return router;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.statusCode) {
    console.log(`-- Error not handled: `, err);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
  const errorObject = {
    code: err.statusCode,
    message: err.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  };

  console.log(`-- Error handled: `, errorObject);

  return res.status(err.statusCode).json(errorObject);
};
