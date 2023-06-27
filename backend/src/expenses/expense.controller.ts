import { Request, Response, Router } from "express";
import { Expense } from "./expense.interface";
import ExpenseService from "./expense.service";
import { IController } from "../core/interfaces";

export default class ExpenseController implements IController {
  public path = "/expense";
  public router = Router();
  private expenseService: ExpenseService;

  constructor(expenseService: ExpenseService) {
    this.expenseService = expenseService;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.findAll);
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
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

  findAll = async (req: Request, res: Response) => {
    const data = await this.expenseService.findAll();

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
