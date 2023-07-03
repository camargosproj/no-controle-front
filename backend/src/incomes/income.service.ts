import { PrismaService } from "../core/shared";
import { Income } from "./incomes.interface";

export default class IncomeService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  findAll = async () => {
    let data = await this.prisma.income.findMany({});

    return data;
  };

  create = async (income: Income) => {
    let data = await this.prisma.income.create({
      data: {
        ...income,
        date: new Date(income.date),
      },
    });
    return data;
  };
}
