import { PrismaService, prismaServiceClient } from "../core/shared";
import CategoryController from "./category.controller";
import CategoryService from "./category.service";

export default class CategoryModule {
  controller: CategoryController;
  services: CategoryService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.services = new CategoryService(this.prisma);
    this.controller = new CategoryController(this.services);
  }
}
