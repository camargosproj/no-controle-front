import { MonthType } from "@prisma/client";
import * as moment from "moment";
import BalanceService from "../balance/balance.service";
import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { Expense } from "./expense.interface";

export default class ExpenseService {
  private prisma: PrismaService;
  private balanceService: BalanceService;
  constructor(prisma: PrismaService, balanceService: BalanceService) {
    this.prisma = prisma;
    this.balanceService = balanceService;
  }
  async create(expense: Expense) {
    const balanceMonthName = moment(expense.date).format("MMMM").toUpperCase();
    const year = moment(expense.date).format("YYYY");
    let transactionDefaultGroup;
    transactionDefaultGroup = await this.prisma.transactionGroup.findFirst({
      where: {
        userId: expense.userId,
        isDefault: true,
        type: "EXPENSE",
        month: balanceMonthName as MonthType,
        year,
      },
      select: {
        id: true,
      },
    });

    if (!transactionDefaultGroup) {
      // create default transaction group for the month
      transactionDefaultGroup = await this.prisma.transactionGroup.create({
        data: {
          name: "Geral - Minha Despesas",
          description: "Grupo de transações de despesas",
          userId: expense.userId,
          isDefault: true,
          month: balanceMonthName as MonthType,
          type: "EXPENSE",
          year,
        },
      });
    }

    const transactionGroupId =
      expense?.transactionGroupId || transactionDefaultGroup.id;
    const expenseData = await this.prisma.expense.create({
      data: {
        ...expense,
        transactionGroupId,
        date: new Date(expense.date),
      },
    });

    const totalAmount =
      await this.balanceService.updateTransactionGroupTotalAmount(
        transactionGroupId,
        "expense",
        balanceMonthName as MonthType,
        year
      );
    return { ...expenseData, totalAmount };
  }

  async findAll(
    userId: string,
    transactionGroupId: string,
    month?: MonthType,
    year?: string
  ) {
    if (!month) {
      month = moment().format("MMMM").toUpperCase() as MonthType;
    }
    if (!year) {
      year = moment().format("YYYY");
    }

    let data = await this.prisma.expense.findMany({
      where: {
        userId,
        transactionGroupId,
        transactionGroup: {
          month: month,
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
        "expense",
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
    const expense = await this.prisma.expense.findFirst({
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

    if (!expense) {
      throw new NotFoundError("Expense not found");
    }

    return expense;
  }

  async update(userId: string, id: string, data: Expense) {
    const expense = await this.findOne(userId, id);

    const updatedExpense = await this.prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...data,
        date: new Date(data.date),
      },
    });

    const balanceMonthName = moment(updatedExpense.date).format("MMMM");
    const year = moment(updatedExpense.date).format("YYYY");

    if (expense.transactionGroupId !== data.transactionGroupId) {
      await this.balanceService.updateTransactionGroupTotalAmount(
        expense.transactionGroupId,
        "expense",
        balanceMonthName as MonthType,
        year
      );
    }
    await this.balanceService.updateTransactionGroupTotalAmount(
      data.transactionGroupId,
      "expense",
      balanceMonthName as MonthType,
      year
    );

    return updatedExpense;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    const deletedExpense = await this.prisma.expense.delete({
      where: {
        id,
      },
    });

    const balanceMonthName = moment(deletedExpense.date).format("MMMM");
    const year = moment(deletedExpense.date).format("YYYY");

    await this.balanceService.updateTransactionGroupTotalAmount(
      deletedExpense.transactionGroupId,
      "expense",
      balanceMonthName as MonthType,
      year
    );

    return;
  }
}
