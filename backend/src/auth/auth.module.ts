import { PrismaService, prismaServiceClient } from "../core/shared";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

export default class AuthModule {
  controller: AuthController;
  services: AuthService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.services = new AuthService(this.prisma);
    this.controller = new AuthController(this.services);
  }
}
