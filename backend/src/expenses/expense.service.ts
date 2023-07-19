import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { Expense } from "./expense.interface";

export default class ExpenseService {
  private prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async create(expense: Expense) {
    const expenseData = await this.prisma.expense.create({
      data: {
        ...expense,
        date: new Date(expense.date),
      },
    });

    const totalAmount = await this.updateTotalAmount(
      expense.transactionGroupId
    );
    return { ...expenseData, totalAmount };
  }
  async findAll(userId: string, transactionGroupId: string) {
    let data = await this.prisma.expense.findMany({
      where: {
        userId,
        transactionGroupId,
      },
    });

    const totalAmount = await this.getTotalAmount(transactionGroupId);
    if (totalAmount) {
      return [...data, { totalAmount }];
    }
    return {
      data: data,
      balance: await this.getBalance(userId),
    };
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

  async findOne(userId: string, id: string) {
    const expense = await this.prisma.expense.findFirst({
      where: {
        id,
        userId,
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
      await this.updateTotalAmount(expense.transactionGroupId);
    }
    await this.updateTotalAmount(data.transactionGroupId);

    return updatedExpense;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    const updatedExpense = await this.prisma.expense.delete({
      where: {
        id,
      },
    });

    await this.updateTotalAmount(updatedExpense.transactionGroupId);

    return;
  }

  async getTotalAmount(transactionGroupId: string) {
    if (!transactionGroupId) {
      return;
    }
    await this.updateTotalAmount(transactionGroupId);

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

  async updateTotalAmount(transactionGroupId: string) {
    const totalAmount = await this.prisma.expense.aggregate({
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
}
