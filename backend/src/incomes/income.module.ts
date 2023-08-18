import BalanceService from "../balance/balance.service";
import { PrismaService, prismaServiceClient } from "../core/shared";
import IncomeService from "./income.service";
import IncomesController from "./incomes.controller";

export default class IncomeModule {
  controller: IncomesController;
  services: IncomeService;
  balanceService: BalanceService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.balanceService = new BalanceService(this.prisma);
    this.services = new IncomeService(this.prisma, this.balanceService);
    this.controller = new IncomesController(this.services);
  }
}
