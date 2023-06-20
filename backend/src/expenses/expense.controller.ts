import { Request, Response, Router } from "express";
import { Expense } from "./expense.interface";
import ExpenseService from "./expense.service";
import { IController } from "../@core/interfaces";

export default class ExpenseController implements IController {
  public path = "/expense";
  public router = Router();
  private expenseService: ExpenseService;

  constructor(expenseService: ExpenseService) {
    this.expenseService = expenseService;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.findAll);
    this.router.post(this.path, this.create);
    // this.router.get(this.path + "/by-group", this.getAllExpensesByGroups);
    // this.router.get(
    //   this.path + "/sharedgroups",
    //   this.getAllSharedGroupAccounts
    // );
    // this.router.post(this.path + "/groupaccounts", this.createGroupAccount);
  }

  findAll = async (req: Request, res: Response) => {
    const data = await this.expenseService.findAll();

    res.send(data);
  };

  findOne(req: Request, res: Response, id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  create = async (req: Request, res: Response) => {
    try {
      const expense: Expense = req.body;
      let data = await this.expenseService.create(expense);

      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: e.message,
      });
      return;
    }
  };
  update(req: Request, res: Response, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response, id: string): void {
    throw new Error("Method not implemented.");
  }

  // getAllExpensesByGroups = async (
  //   request: Request,
  //   response: Response
  // ) => {
  //   let data = await prismaClient.accountGroup.findMany({
  //     where: {
  //       Expense: {
  //         some: {
  //           id: {
  //             not: undefined,
  //           },
  //         },
  //       },
  //     },
  //     include: {
  //       Expense: true,
  //     },
  //   });

  //   response.send(data);
  // };

  // getAllSharedGroupAccounts = async (
  //   request: Request,
  //   response: Response
  // ) => {
  //   let data = await prismaClient.sharedAccountGroup.findMany({
  //     where: {
  //       Expense: {
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
  //           Expense: true,
  //           groupOwner: true,
  //         },
  //       },
  //     },
  //   });

  //   response.send(data);
  // };

  // createGroupAccount = async (
  //   request: Request,
  //   response: Response
  // ) => {
  //   const accountGroup: AccountGroup = request.body;
  //   let data = await prismaClient.accountGroup.create({
  //     data: accountGroup,
  //   });
  //   response.send(data);
  // };
}
