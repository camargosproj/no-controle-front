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
  async updateTransactionGroupTotalAmount(
    transactionGroupId: string,
    type: BalanceModel,
    month: MonthType,
    year: string
  ) {
    month = month.toUpperCase() as MonthType;
    let totalAmount;
    if (type === "income") {
      totalAmount = await this.prisma.income.aggregate({
        where: {
          transactionGroupId,
          transactionGroup: {
            month,
            year,
          },
        },
        _sum: {
          amount: true,
        },
      });
    } else {
      totalAmount = await this.prisma.expense.aggregate({
        where: {
          transactionGroupId,
          transactionGroup: {
            month,
            year,
          },
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
          month: month as MonthType,
          year,
        },
        data: {
          totalAmount: totalAmount._sum.amount,
          month: month as MonthType,
          year,
        },
      }),
    ]);

    return totalAmount._sum.amount;
  }

  async getBalance(userId: string, month?: MonthType, year?: string) {
    if (!month && !year) {
      month = moment().format("MMMM").toUpperCase() as MonthType;
      year = moment().format("YYYY");
    } else {
      month = month.toUpperCase() as MonthType;
    }
    const totalExpense = await this.prisma.expense.aggregate({
      where: {
        userId,
        transactionGroup: {
          month: month,
          year,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalIncome = await this.prisma.income.aggregate({
      where: {
        userId,
        transactionGroup: {
          month: month,
          year,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalBalance = totalIncome._sum.amount - totalExpense._sum.amount;

    if (!totalIncome._sum.amount && !totalExpense._sum.amount) {
      return {
        totalExpense: 0,
        totalIncome: 0,
        totalBalance: 0,
        month,
        year,
      };
    }

    return await this.createOrUpdateBalance(userId, month, year, {
      totalExpense: totalExpense._sum.amount,
      totalIncome: totalIncome._sum.amount,
      totalBalance,
    });
  }

  async createOrUpdateBalance(
    userId: string,
    month: MonthType,
    year: string,
    { totalExpense, totalIncome, totalBalance }
  ) {
    let balanceData;

    const balance = await this.prisma.balance.findFirst({
      where: {
        userId,
        month: month,
        year,
      },
    });

    if (!balance) {
      balanceData = await this.prisma.balance.create({
        data: {
          userId,
          month: month,
          year,
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
        select: {
          expenseTotal: true,
          incomeTotal: true,
          balance: true,
          month: true,
          year: true,
        },
      });
    }

    return {
      totalExpense: balanceData.expenseTotal,
      totalIncome: balanceData.incomeTotal,
      totalBalance: balanceData.balance,
      month: balanceData.month,
      year: balanceData.year,
    };
  }

  async getTransactionGroupTotalAmount(
    transactionGroupId: string,
    type: BalanceModel,
    month: MonthType,
    year: string
  ) {
    month = month.toUpperCase() as MonthType;
    if (!transactionGroupId) {
      return;
    }
    await this.updateTransactionGroupTotalAmount(
      transactionGroupId,
      type,
      month,
      year
    );

    const group = await this.prisma.transactionGroup.findFirst({
      where: {
        id: transactionGroupId,
        month: month as MonthType,
        year,
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
