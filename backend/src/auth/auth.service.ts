import { MonthType } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import BalanceService from "../balance/balance.service";
import { PrismaService } from "../core/shared";
import EmailService from "../core/shared/email/email.service";
import {
  ConflictError,
  GoneRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/custom-errors";
import {
  comparePassword,
  generateVerificationCode,
  hashPassword,
} from "../utils/util";
import { envConfig } from "../utils/validateEnv";

export default class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private balanceService: BalanceService
  ) {}

  async findUserSummary(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        Balance: {
          where: {
            year: moment().format("YYYY"),
          },
          select: {
            id: true,
            month: true,
            year: true,
            balance: true,
            expenseTotal: true,
            incomeTotal: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const balance = await this.balanceService.getBalance(id);

    const data = {
      ...user,
      year: user.Balance,
      month: balance,
    };

    delete data.Balance;

    return data;
  }

  async singIn(email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        validated: true,
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

    const { verificationCode, verificationCodeExpiration } =
      generateVerificationCode();

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        verificationCode,
        verificationCodeExpiration,
        TransactionGroup: {
          createMany: {
            data: [
              {
                name: "Geral - Minha Despesas",
                description: "Grupo de transações de despesas",
                isDefault: true,
                type: "EXPENSE",
                month: moment()
                  .format("MMMM")
                  .toUpperCase()
                  .toUpperCase() as MonthType,
                year: moment().format("YYYY"),
              },
              {
                name: "Geral - Minhas Receitas",
                description: "Grupo de transações de receitas",
                isDefault: true,
                type: "INCOME",
                month: moment()
                  .format("MMMM")
                  .toUpperCase()
                  .toUpperCase() as MonthType,
                year: moment().format("YYYY"),
              },
            ],
          },
        },
      },
      select: {
        name: true,
        email: true,
      },
    });

    const message = this.emailService.getVerificationCodeMessage(
      newUser.name,
      verificationCode
    );

    this.emailService.sendEmail(newUser.email, "Bem-vindo ao NoControle", {
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
    const user = await this.verifyVerificationCode(email, code);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        validated: true,
        verificationCode: null,
      },
    });
  }

  async verifyVerificationCode(email: string, code: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
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

    return userExists;
  }

  async sendVerificationCode(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { verificationCode, verificationCodeExpiration } =
      generateVerificationCode();

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verificationCode,
        verificationCodeExpiration,
      },
    });

    const message = this.emailService.getVerificationCodeMessage(
      user.name,
      verificationCode
    );

    this.emailService.sendEmail(user.email, "Código de Verificação", {
      html: message,
    });
  }

  async resetPassword(
    email: string,
    verificationCode: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.verifyVerificationCode(email, verificationCode);

    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Old password is invalid");
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hashPassword(newPassword),
        verificationCode: null,
        verificationCodeExpiration: null,
      },
    });
  }
}
