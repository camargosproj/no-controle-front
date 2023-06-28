import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      authUser?: decodedToken;
    }
  }
}

export type decodedToken = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
