import { MonthType } from "@prisma/client";
import * as moment from "moment";
import BalanceService from "../balance/balance.service";
import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { Income } from "./incomes.interface";

export default class IncomeService {
  constructor(
    private prisma: PrismaService,
    private balanceService: BalanceService
  ) {}

  async create(income: Income) {
    const balanceMonthName = moment(income.date).format("MMMM").toUpperCase();
    const year = moment(income.date).format("YYYY");
    let transactionDefaultGroup;
    transactionDefaultGroup = await this.prisma.transactionGroup.findFirst({
      where: {
        userId: income.userId,
        isDefault: true,
        month: balanceMonthName as MonthType,
        year,
        type: "INCOME",
      },
      select: {
        id: true,
      },
    });

    if (!transactionDefaultGroup) {
      // create default transaction group for the month
      transactionDefaultGroup = await this.prisma.transactionGroup.create({
        data: {
          name: "Geral - Minhas Receitas",
          description: "Grupo de transações de receitas",
          userId: income.userId,
          isDefault: true,
          month: balanceMonthName as MonthType,
          year,
          type: "INCOME",
        },
      });
    }

    const transactionGroupId =
      income?.transactionGroupId || transactionDefaultGroup.id;

    const incomeData = await this.prisma.income.create({
      data: {
        ...income,
        transactionGroupId,
        date: new Date(income.date),
      },
    });

    const totalAmount =
      await this.balanceService.updateTransactionGroupTotalAmount(
        transactionGroupId,
        "income",
        balanceMonthName as MonthType,
        year
      );
    return { ...incomeData, totalAmount };
  }

  async findAll(
    userId: string,
    transactionGroupId: string,
    month?: string,
    year?: string
  ) {
    if (!month) {
      month = moment().format("MMMM").toUpperCase();
    }

    if (!year) {
      year = moment().format("YYYY");
    }
    let data = await this.prisma.income.findMany({
      where: {
        userId,
        transactionGroupId,
        transactionGroup: {
          month: month as MonthType,
          year,
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalAmount =
      await this.balanceService.getTransactionGroupTotalAmount(
        transactionGroupId,
        "income",
        month as MonthType,
        year
      );
    if (totalAmount) {
      return [...data, { totalAmount }];
    }
    return {
      data: data,
      balance: await this.balanceService.getBalance(
        userId,
        month as MonthType,
        year
      ),
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
    const year = moment(updatedIncome.date).format("YYYY");

    if (
      data.transactionGroupId &&
      income.transactionGroupId !== data.transactionGroupId
    ) {
      await this.balanceService.updateTransactionGroupTotalAmount(
        income.transactionGroupId,
        "income",
        balanceMonthName as MonthType,
        year
      );
    } else {
      await this.balanceService.updateTransactionGroupTotalAmount(
        updatedIncome.transactionGroupId,
        "income",
        balanceMonthName as MonthType,
        year
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
    const year = moment(deletedIncome.date).format("YYYY");

    await this.balanceService.updateTransactionGroupTotalAmount(
      deletedIncome.transactionGroupId,
      "income",
      balanceMonthName as MonthType,
      year
    );

    return;
  }
}
