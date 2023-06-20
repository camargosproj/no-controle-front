import { PrismaService } from "../@core/shared";
import CategoryController from "./category.controller";
import CategoryService from "./category.service";

export default class CategoryModule {
  controller: CategoryController;
  services: CategoryService;
  prisma: PrismaService;
  constructor() {
    this.prisma = new PrismaService();
    this.services = new CategoryService(this.prisma);
    this.controller = new CategoryController(this.services);
  }
}
