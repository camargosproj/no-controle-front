import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors/custom-erros";
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

    const totalAmount = await this.updateTotalAmount(expense.accountGroupId);
    return { ...expenseData, totalAmount };
  }
  async findAll(userId: string, accountGroupId: string): Promise<any[]> {
    let data = await this.prisma.expense.findMany({
      where: {
        userId,
      },
    });

    const totalAmount = await this.getTotalAmount(accountGroupId);

    if (totalAmount) {
      return [...data, { totalAmount }];
    }

    return data;
  }

  async getTotalAmount(accountGroupId: string) {
    if (!accountGroupId) {
      return;
    }
    const totalAmount = await this.updateTotalAmount(accountGroupId);

    const group = await this.prisma.accountGroup.findFirst({
      where: {
        id: accountGroupId,
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

  async updateTotalAmount(accountGroupId: string) {
    const totalAmount = await this.prisma.expense.aggregate({
      where: {
        accountGroupId,
      },
      _sum: {
        amount: true,
      },
    });

    if (!totalAmount._sum.amount) {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.accountGroup.update({
        where: {
          id: accountGroupId,
        },
        data: {
          totalAmount: totalAmount._sum.amount,
        },
      }),
    ]);

    return totalAmount._sum.amount;
  }
}