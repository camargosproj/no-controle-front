import BalanceService from "../balance/balance.service";
import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { Income } from "./incomes.interface";

export default class IncomeService {
  private prisma: PrismaService;
  private balanceService: BalanceService;

  constructor(prisma: PrismaService, balanceService: BalanceService) {
    this.prisma = prisma;
    this.balanceService = balanceService;
  }

  async create(income: Income) {
    const transsactionDefaultGroup =
      await this.prisma.transactionGroup.findFirst({
        where: {
          userId: income.userId,
          isDefault: true,
          type: "INCOME",
        },
        select: {
          id: true,
        },
      });

    const transactionGroupId =
      income?.transactionGroupId || transsactionDefaultGroup.id;

    const incomeData = await this.prisma.income.create({
      data: {
        ...income,
        transactionGroupId,
        date: new Date(income.date),
      },
    });

    const totalAmount = await this.balanceService.updateTotalAmount(
      transactionGroupId,
      "income"
    );
    return { ...incomeData, totalAmount };
  }

  async findAll(userId: string, transactionGroupId: string) {
    let data = await this.prisma.income.findMany({
      where: {
        userId,
        transactionGroupId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalAmount = await this.balanceService.getTotalAmount(
      transactionGroupId,
      "income"
    );
    if (totalAmount) {
      return [...data, { totalAmount }];
    }
    return {
      data: data,
      balance: await this.balanceService.getBalance(userId),
    };
  }

  async findOne(userId: string, id: string) {
    const income = await this.prisma.income.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!income) {
      throw new NotFoundError("Income not found");
    }

    return income;
  }

  async update(userId: string, id: string, data: Income) {
    const income = await this.findOne(userId, id);

    const updatedIncome = await this.prisma.income.update({
      where: {
        id,
      },
      data: {
        ...data,
        date: new Date(data.date),
      },
    });

    if (
      data.transactionGroupId &&
      income.transactionGroupId !== data.transactionGroupId
    ) {
      await this.balanceService.updateTotalAmount(
        income.transactionGroupId,
        "income"
      );
    } else {
      await this.balanceService.updateTotalAmount(
        updatedIncome.transactionGroupId,
        "income"
      );
    }

    return updatedIncome;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    const updatedIncome = await this.prisma.income.delete({
      where: {
        id,
      },
    });

    await this.balanceService.updateTotalAmount(
      updatedIncome.transactionGroupId,
      "income"
    );

    return;
  }
}
