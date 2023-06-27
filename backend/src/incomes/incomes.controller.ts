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

  initializeRoutes(): void {
    this.router.get(this.path, this.findAll);
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
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

  findOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
}
