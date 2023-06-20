import { IService } from "../@core/interfaces";
import { PrismaService } from "../@core/shared";
import { Expense } from "./expense.interface";

export default class ExpenseService implements IService {
  private prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async create(expense: Expense) {
    return await this.prisma.expense.create({
      data: {
        ...expense,
        date: new Date(expense.date),
      },
    });

    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<any[]> {
    let data = await this.prisma.expense.findMany({});
    return data;
  }
  findOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
}
