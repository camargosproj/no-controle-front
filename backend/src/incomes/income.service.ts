import { IService } from "../@core/interfaces";
import { PrismaService } from "../@core/shared";
import { Income } from "./incomes.interface";

export default class IncomeService implements IService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
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

  findAll = async () => {
    let data = await this.prisma.income.findMany({});

    return data;
  };

  // getAllincomesByGroups = async (
  //   request: express.Request,
  //   response: express.Response
  // ) => {
  //   let data = await prismaClient.accountGroup.findMany({
  //     where: {
  //       Income: {
  //         some: {
  //           id: {
  //             not: undefined,
  //           },
  //         },
  //       },
  //     },

  //     include: {
  //       Income: true,
  //     },
  //   });

  //   response.send(data);
  // };

  // getAllSharedGroupAccounts = async (
  //   request: express.Request,
  //   response: express.Response
  // ) => {
  //   let data = await prismaClient.sharedAccountGroup.findMany({
  //     where: {
  //       Income: {
  //         some: {
  //           id: {
  //             not: undefined,
  //           },
  //         },
  //       },
  //     },
  //     include: {
  //       sharedWith: true,
  //       accountGroup: {
  //         include: {
  //           Income: true,
  //           groupOwner: true,
  //         },
  //       },
  //     },
  //   });

  //   response.send(data);
  // };

  create = async (income: Income) => {
    let data = await this.prisma.income.create({
      data: {
        ...income,
        date: new Date(income.date),
      },
    });
    return data;
  };

  // createGroupAccount = async (
  //   request: express.Request,
  //   response: express.Response
  // ) => {
  //   const accountGroup: AccountGroup = request.body;
  //   let data = await prismaClient.accountGroup.create({
  //     data: accountGroup,
  //   });
  //   response.send(data);
  // };
}
