import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "marcoscamargo@outlook.com",
        name: "Marcos Camargo",
        password: "12345678",
      },

      {
        email: "mellinocamargo@live.com",
        name: "Leticia Camargo",
        password: "12345678",
      },
    ],
    skipDuplicates: true,
  });

  // return;
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

  // await prisma.family.create({
  //   data: {
  //     name: "Familia Camargo",
  //     users: {
  //       createMany: {
  //         data: [
  //           {
  //             email: "marcoscamargo@outlook.com",
  //             name: "Marcos Camargo",
  //             password: "12345678",
  //           },

  //           {
  //             email: "mellinocamargo@live.com",
  //             name: "Leticia Camargo",
  //             password: "12345678",
  //           },
  //         ],
  //         skipDuplicates: true,
  //       },
  //     },
  //   },
  // });
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
