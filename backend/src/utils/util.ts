import * as bcrypt from "bcrypt";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import { decodedToken } from "../typings";
import { envConfig } from "./validateEnv";

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

export function generateVerificationCode() {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const verificationCodeExpiration = moment()
    .add(envConfig.VERIFICATION_CODE_EXPIRES_IN, "minutes")
    .toDate();

  return { verificationCode, verificationCodeExpiration };
}
