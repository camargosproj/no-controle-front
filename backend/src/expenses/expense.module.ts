import { PrismaService } from "../@core/shared";
import ExpenseController from "./expense.controller";
import ExpenseService from "./expense.service";

export default class ExpenseModule {
  controller: ExpenseController;
  services: ExpenseService;
  prisma: PrismaService;
  constructor() {
    this.prisma = new PrismaService();
    this.services = new ExpenseService(this.prisma);
    this.controller = new ExpenseController(this.services);
  }
}
