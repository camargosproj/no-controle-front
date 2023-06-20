import { Category } from "@prisma/client";
import { PrismaService } from "../core/shared";
import { IService } from "../core/interfaces";

export default class CategoryService implements IService {
  constructor(private prisma: PrismaService) {}
  create(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
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
