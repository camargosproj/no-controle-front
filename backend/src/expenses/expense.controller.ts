import { Request, Response, Router } from "express";
import { Expense } from "./expense.interface";
import ExpenseService from "./expense.service";
import { IController } from "../core/interfaces";
import { toAsyncRouter } from "../middlewares/error.middleware";

export default class ExpenseController implements IController {
  public path = "/expense";
  router: Router = toAsyncRouter();
  private expenseService: ExpenseService;
  isPrivate: boolean = true;

  constructor(expenseService: ExpenseService) {
    this.expenseService = expenseService;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.findAll);
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
  }

  create = async (req: Request, res: Response) => {
    const expense: Expense = req.body;
    let data = await this.expenseService.create(expense);

    res.json(data);
  };

  findAll = async (req: Request, res: Response) => {
    const userId = null;
    const { accountGroupId } = req.query;
    const data = await this.expenseService.findAll(
      userId as string,
      accountGroupId as string
    );

    res.send(data);
  };

  findOne = async (req: Request, res: Response): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  update = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
  delete = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
