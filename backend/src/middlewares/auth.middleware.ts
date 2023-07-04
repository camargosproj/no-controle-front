import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors";
import { verifyToken } from "../utils/util";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new BadRequestError("Token not provided");
  }

  req.headers["authorization"] = `Bearer ${token}`;

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new BadRequestError("Invalid token");
  }

  // Pass the decoded token to the next middleware
  req.authUser = decoded;

  next();
};
