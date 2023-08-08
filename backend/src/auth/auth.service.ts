import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import { PrismaService } from "../core/shared";
import EmailService from "../core/shared/email/email.service";
import {
  ConflictError,
  GoneRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/custom-errors";
import { comparePassword, hashPassword } from "../utils/util";
import { envConfig } from "../utils/validateEnv";

export default class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async singIn(email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (!userExists.validated) {
      throw new UnauthorizedError("User not validated");
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
      envConfig.JWT_SECRET,
      {
        expiresIn: envConfig.JWT_EXPIRES_IN,
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
      throw new ConflictError("User already exists");
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationCodeExpiration = moment()
      .add(envConfig.VERIFICATION_CODE_EXPIRES_IN, "minutes")
      .toDate();

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        verificationCode,
        verificationCodeExpiration,
      },
      select: {
        name: true,
        email: true,
      },
    });

    const message = `Olá ${newUser.name}, <br>Para validar seu email use seu código de validação <strong>${verificationCode}</strong>`;

    this.emailService.sendEmail(newUser.email, "Bem-vindo ao NoControle ", {
      html: message,
    });

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

  async validateUser(email: string, code: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
        validated: false,
        verificationCode: code,
      },
    });

    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    // Verify if code is expired
    if (moment().isAfter(userExists.verificationCodeExpiration)) {
      await this.prisma.user.update({
        where: {
          id: userExists.id,
        },
        data: {
          verificationCode: null,
        },
      });

      throw new GoneRequestError("Code expired");
    }

    await this.prisma.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        validated: true,
        verificationCode: null,
      },
    });
  }
}
