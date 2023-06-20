import { PrismaService, prismaServiceClient } from "../core/shared";
import IncomeService from "./income.service";
import IncomesController from "./incomes.controller";

export default class IncomeModule {
  controller: IncomesController;
  services: IncomeService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.services = new IncomeService(this.prisma);
    this.controller = new IncomesController(this.services);
  }
}
