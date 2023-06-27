import { PrismaService } from "../core/shared";
import { IService } from "../core/interfaces";
import { Category } from "@prisma/client";

export default class CategoryService implements IService {
  constructor(private prisma: PrismaService) {}

  create(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<any[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
  async findOne(id: string): Promise<any> {
    const category = this.prisma.category.findFirst({
      where: { id: id },
    });
    return category;
  }

  async update(id: string, data: any) {
    const category = await this.findOne(id);
    if (!category) {
      return;
    }

    const updatedCategory = this.prisma.category.update({
      where: { id: id },
      data: { name: data.name },
    });
    return updatedCategory;
  }

  async delete(id: string) {
    const category = await this.findOne(id);
    if (!category) {
      return;
    }
    return await this.prisma.category.delete({ where: { id: id } });
  }
}
