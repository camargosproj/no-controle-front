import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { decodedToken } from "../typings";

export function hashPassword(password: string) {
  return bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function verifyToken(token: string): decodedToken | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}
