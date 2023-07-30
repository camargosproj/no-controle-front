import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { BalanceModel } from "./balance.interface";

export default class BalanceService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async updateTotalAmount(transactionGroupId: string, type: BalanceModel) {
    const totalAmount = await this.prisma[type].aggregate({
      where: {
        transactionGroupId,
      },
      _sum: {
        amount: true,
      },
    });

    if (!totalAmount._sum.amount) {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.transactionGroup.update({
        where: {
          id: transactionGroupId,
        },
        data: {
          totalAmount: totalAmount._sum.amount,
        },
      }),
    ]);

    return totalAmount._sum.amount;
  }

  async getBalance(userId: string) {
    const totalExpense = await this.prisma.expense.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    const totalIncome = await this.prisma.income.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    const totalBalance = totalIncome._sum.amount - totalExpense._sum.amount;

    const data = await this.prisma.balance.upsert({
      where: {
        userId,
      },
      update: {
        expenseTotal: totalExpense._sum.amount,
        incomeTotal: totalIncome._sum.amount,
        balance: totalBalance,
      },
      create: {
        userId,
        expenseTotal: totalExpense._sum.amount,
        incomeTotal: totalIncome._sum.amount,
        balance: totalBalance,
      },
      select: {
        expenseTotal: true,
        incomeTotal: true,
        balance: true,
      },
    });

    return {
      totalExpense: data.expenseTotal,
      totalIncome: data.incomeTotal,
      totalBalance: data.balance,
    };
  }

  async getTotalAmount(transactionGroupId: string, type: BalanceModel) {
    if (!transactionGroupId) {
      return;
    }
    await this.updateTotalAmount(transactionGroupId, type);

    const group = await this.prisma.transactionGroup.findFirst({
      where: {
        id: transactionGroupId,
      },
      select: {
        totalAmount: true,
      },
    });

    if (!group) {
      throw new NotFoundError("Group not found");
    }

    return group.totalAmount;
  }
}
