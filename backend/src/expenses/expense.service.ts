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
    const transsactionDefaultGroup =
      await this.prisma.transactionGroup.findFirst({
        where: {
          userId: expense.userId,
          isDefault: true,
          type: "EXPENSE",
        },
        select: {
          id: true,
        },
      });

    const transactionGroupId =
      expense?.transactionGroupId || transsactionDefaultGroup.id;
    const expenseData = await this.prisma.expense.create({
      data: {
        ...expense,
        transactionGroupId,
        date: new Date(expense.date),
      },
    });

    const totalAmount = await this.balanceService.updateTotalAmount(
      transactionGroupId,
      "expense"
    );
    return { ...expenseData, totalAmount };
  }

  async findAll(userId: string, transactionGroupId: string) {
    let data = await this.prisma.expense.findMany({
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
      "expense"
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

    if (expense.transactionGroupId !== data.transactionGroupId) {
      await this.balanceService.updateTotalAmount(
        expense.transactionGroupId,
        "expense"
      );
    }
    await this.balanceService.updateTotalAmount(
      data.transactionGroupId,
      "expense"
    );

    return updatedExpense;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    const updatedExpense = await this.prisma.expense.delete({
      where: {
        id,
      },
    });

    await this.balanceService.updateTotalAmount(
      updatedExpense.transactionGroupId,
      "expense"
    );

    return;
  }
}
