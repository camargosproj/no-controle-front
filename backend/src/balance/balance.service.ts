import { MonthType } from "@prisma/client";
import * as moment from "moment";
import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { BalanceModel } from "./balance.interface";

export default class BalanceService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async updateTotalAmount(
    transactionGroupId: string,
    type: BalanceModel,
    balanceMonthName: MonthType
  ) {
    let totalAmount;
    if (type === "income") {
      totalAmount = await this.prisma.income.aggregate({
        where: {
          transactionGroupId,
        },
        _sum: {
          amount: true,
        },
      });
    } else {
      totalAmount = await this.prisma.expense.aggregate({
        where: {
          transactionGroupId,
        },
        _sum: {
          amount: true,
        },
      });
    }

    if (!totalAmount._sum.amount) {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.transactionGroup.update({
        where: {
          id: transactionGroupId,
          month: balanceMonthName.toUpperCase() as MonthType,
        },
        data: {
          totalAmount: totalAmount._sum.amount,
          month: balanceMonthName.toUpperCase() as MonthType,
        },
      }),
    ]);

    return totalAmount._sum.amount;
  }

  async getBalance(userId: string, balanceMonthName?: MonthType) {
    if (!balanceMonthName) {
      balanceMonthName = moment().format("MMMM").toUpperCase() as MonthType;
    }
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

    return await this.createOrUpdateBalance(userId, balanceMonthName, {
      totalExpense: totalExpense._sum.amount,
      totalIncome: totalIncome._sum.amount,
      totalBalance,
    });
  }

  async createOrUpdateBalance(
    userId: string,
    balanceMonthName: MonthType,
    { totalExpense, totalIncome, totalBalance }
  ) {
    let balanceData;

    const balance = await this.prisma.balance.findFirst({
      where: {
        userId,
        month: balanceMonthName,
      },
    });

    if (!balance) {
      balanceData = await this.prisma.balance.create({
        data: {
          userId,
          month: balanceMonthName,
          incomeTotal: totalIncome || 0,
          expenseTotal: totalExpense || 0,
          balance: totalBalance || 0,
        },
      });
    } else {
      balanceData = await this.prisma.balance.update({
        where: {
          id: balance.id,
        },
        data: {
          incomeTotal: totalIncome || 0,
          expenseTotal: totalExpense || 0,
          balance: totalBalance || 0,
        },
      });
    }

    return {
      totalExpense: balanceData.expenseTotal,
      totalIncome: balanceData.incomeTotal,
      totalBalance: balanceData.balance,
      month: balanceData.month,
    };
  }

  async getTotalAmount(
    transactionGroupId: string,
    type: BalanceModel,
    balanceMonthName: MonthType
  ) {
    if (!transactionGroupId) {
      return;
    }
    await this.updateTotalAmount(transactionGroupId, type, balanceMonthName);

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
