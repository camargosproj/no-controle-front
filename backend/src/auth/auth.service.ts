import * as jwt from "jsonwebtoken";
import { PrismaService } from "../core/shared";
import { UnauthorizedError } from "../errors/custom-errors";
import { comparePassword, hashPassword } from "../utils/util";

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

  async singUp(name: string, email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new UnauthorizedError("User already exists");
    }

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });

    delete newUser.password;
    return newUser;
  }

  async updateUser(id: string, name: string, email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new UnauthorizedError("User not found");
    }

    const newUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
      select: {
        name: true,
      },
    });

    return newUser;
  }
}
