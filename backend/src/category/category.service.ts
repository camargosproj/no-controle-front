import { PrismaService } from "../core/shared";

export default class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(type: "Receitas" | "Despesas"): Promise<any[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        type,
      },
    });
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
