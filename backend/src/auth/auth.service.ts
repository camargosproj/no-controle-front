import { PrismaService } from "../core/shared";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/custom-erros";
import { comparePassword } from "../utils/util";

export default class AuthService {
  constructor(private prisma: PrismaService) {}

  async singIn(email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(
      password,
      userExists.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    delete userExists.password;
    return { ...userExists, accessToken };
  }
}
