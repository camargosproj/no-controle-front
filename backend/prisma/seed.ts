import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/util";

const prisma = new PrismaClient();
async function main() {
  const hash = await hashPassword("12345678");
  const user = {
    email: "dev@dev.com",
    name: "dev",
    password: hash,
    validated: true,
  };

  await prisma.user.upsert({
    where: { email: user.email },
    create: user,
    update: user,
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
