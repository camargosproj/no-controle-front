import { PrismaService, prismaServiceClient } from "../core/shared";
import EmailService from "../core/shared/email/email.service";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

export default class AuthModule {
  controller: AuthController;
  services: AuthService;
  emailService: EmailService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.emailService = new EmailService();
    this.services = new AuthService(this.prisma, this.emailService);
    this.controller = new AuthController(this.services);
  }
}
