import BalanceService from "../balance/balance.service";
import { PrismaService, prismaServiceClient } from "../core/shared";
import ExpenseController from "./expense.controller";
import ExpenseService from "./expense.service";

export default class ExpenseModule {
  controller: ExpenseController;
  services: ExpenseService;
  balanceService: BalanceService;
  prisma: PrismaService;
  constructor() {
    this.prisma = prismaServiceClient;
    this.balanceService = new BalanceService(this.prisma);
    this.services = new ExpenseService(this.prisma, this.balanceService);
    this.controller = new ExpenseController(this.services);
  }
}
