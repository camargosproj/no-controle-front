import { Response, Request, Router } from "express";
import { Income } from "./incomes.interface";
import IncomeService from "./income.service";
import { IController } from "../core/interfaces";
import { toAsyncRouter } from "../middlewares/error.middleware";

export default class IncomesController implements IController {
  public path = "/incomes";
  router: Router = toAsyncRouter();
  private incomeService: IncomeService;
  isPrivate: boolean = true;

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
    const income: Income = req.body;
    let data = await this.incomeService.create(income);

    res.send(data);
  };

  findAll = async (req: Request, res: Response) => {
    let data = await this.incomeService.findAll();

    res.send(data);
  };

  findOne(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
