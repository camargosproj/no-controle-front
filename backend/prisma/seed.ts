import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "dev@dev.com",
        name: "dev",
        password: "12345678",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: "Lazer", type: "Despesas" },
      { name: "Saúde", type: "Despesas" },
      {
        name: "Moradia",
        type: "Despesas",
      },
      { name: "Transporte", type: "Despesas" },
      { name: "Trabalho Fixo", type: "Receitas" },
      { name: "FreeLancer", type: "Receitas" },
      { name: "Governo", type: "Receitas" },
    ],
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
