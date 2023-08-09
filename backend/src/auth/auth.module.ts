import BalanceService from "../balance/balance.service";
import { PrismaService, prismaServiceClient } from "../core/shared";
import EmailService from "../core/shared/email/email.service";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

export default class AuthModule {
  controller: AuthController;
  services: AuthService;
  emailService: EmailService;
  balanceService: BalanceService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.balanceService = new BalanceService(this.prisma);
    this.emailService = new EmailService();
    this.services = new AuthService(
      this.prisma,
      this.emailService,
      this.balanceService
    );
    this.controller = new AuthController(this.services);
  }
}
