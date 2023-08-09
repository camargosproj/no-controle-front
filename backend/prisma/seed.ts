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

  const categories = [
    {
      id: "6b119ea3-fd98-41dd-9178-abb69db1fbaa",
      name: "Lazer",
      type: "Despesas",
    },
    {
      id: "fc80dc59-8923-4be6-b035-e4d4400ce7f9",
      name: "Saúde",
      type: "Despesas",
    },
    {
      id: "4fadf478-2d13-4874-b69d-5d732ff0078f",
      name: "Moradia",
      type: "Despesas",
    },
    {
      id: "577a8e6e-2c29-416f-881e-c8b7792d5121",
      name: "Transporte",
      type: "Despesas",
    },
    {
      id: "d21384e5-9a1a-48g3-9dr7-e816150g3779",
      name: "Diversos",
      type: "Despesas",
    },
    {
      id: "d2h384a5-2a1a-48g3-9dr7-e81as50s3779",
      name: "Mercado",
      type: "Despesas",
    },
    {
      id: "d2hf84a5-2a1a-4813-9dr7-e81as50s677s",
      name: "Educação",
      type: "Despesas",
    },

    {
      id: "440ddf8c-29c6-4472-9112-0b75276bcce6",
      name: "Emprego",
      type: "Receitas",
    },
    {
      id: "900ttf8c-29q6-4472-9112-0b75276bcce6",
      name: "Salário",
      type: "Receitas",
    },
    {
      id: "d49684e5-911a-489a-9de7-e87815073709",
      name: "Freelance/Trabalho autônomo",
      type: "Receitas",
    },
  ];

  for await (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      create: category,
      update: category,
    });
  }
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
