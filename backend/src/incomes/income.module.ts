import { PrismaService } from "../@core/shared";
import IncomeService from "./income.service";
import IncomesController from "./incomes.controller";

export default class IncomeModule {
  controller: IncomesController;
  services: IncomeService;
  prisma: PrismaService;
  constructor() {
    this.prisma = new PrismaService();
    this.services = new IncomeService(this.prisma);
    this.controller = new IncomesController(this.services);
  }
}
