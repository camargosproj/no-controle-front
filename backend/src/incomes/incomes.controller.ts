import { Response, Request, Router } from "express";
import { Income } from "./incomes.interface";
import IncomeService from "./income.service";
import { IController } from "../core/interfaces";

export default class IncomesController implements IController {
  public path = "/incomes";
  public router = Router();
  private incomeService: IncomeService;

  constructor(incomeService: IncomeService) {
    this.incomeService = incomeService;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.findAll);
    this.router.post(this.path, this.create);
    // this.router.get(this.path + "/by-group", this.getAllincomesByGroups);
    // this.router.get(
    //   this.path + "/sharedgroups",
    //   this.getAllSharedGroupAccounts
    // );
    // this.router.post(this.path + "/groupaccounts", this.createGroupAccount);
  }

  create = async (req: Request, res: Response) => {
    try {
      const income: Income = req.body;
      let data = await this.incomeService.create(income);

      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: e.message,
      });
      return;
    }
  };

  findAll = async (req: Request, res: Response) => {
    let data = await this.incomeService.findAll();

    res.send(data);
  };

  findOne(req: Request, res: Response, id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(req: Request, res: Response, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response, id: string): void {
    throw new Error("Method not implemented.");
  }

  // getAllincomesByGroups = async (req: Request, res: Response) => {
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

  // getAllSharedGroupAccounts = async (request: Request, response: Response) => {
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

  // createGroupAccount = async (request: Request, response: Response) => {
  //   const accountGroup: AccountGroup = request.body;
  //   let data = await prismaClient.accountGroup.create({
  //     data: accountGroup,
  //   });
  //   response.send(data);
  // };
}
