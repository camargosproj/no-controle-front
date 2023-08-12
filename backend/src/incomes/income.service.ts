import { MonthType } from "@prisma/client";
import * as moment from "moment";
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

    const balanceMonthName = moment(income.date).format("MMMM");

    const totalAmount = await this.balanceService.updateTotalAmount(
      transactionGroupId,
      "income",
      balanceMonthName as MonthType
    );
    return { ...incomeData, totalAmount };
  }

  async findAll(userId: string, transactionGroupId: string, month?: string) {
    if (!month) {
      month = moment().format("MMMM").toUpperCase();
    }
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
      "income",
      month as MonthType
    );
    if (totalAmount) {
      return [...data, { totalAmount }];
    }
    return {
      data: data,
      balance: await this.balanceService.getBalance(userId, month as MonthType),
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

    const balanceMonthName = moment(updatedIncome.date).format("MMMM");

    if (
      data.transactionGroupId &&
      income.transactionGroupId !== data.transactionGroupId
    ) {
      await this.balanceService.updateTotalAmount(
        income.transactionGroupId,
        "income",
        balanceMonthName as MonthType
      );
    } else {
      await this.balanceService.updateTotalAmount(
        updatedIncome.transactionGroupId,
        "income",
        balanceMonthName as MonthType
      );
    }

    return updatedIncome;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    const deletedIncome = await this.prisma.income.delete({
      where: {
        id,
      },
    });
    const balanceMonthName = moment(deletedIncome.date).format("MMMM");

    await this.balanceService.updateTotalAmount(
      deletedIncome.transactionGroupId,
      "income",
      balanceMonthName as MonthType
    );

    return;
  }
}
