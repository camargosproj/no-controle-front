import { MonthType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { IController } from "../core/interfaces";
import { BadRequestError } from "../errors";
import { toAsyncRouter } from "../middlewares/error.middleware";
import IncomeService from "./income.service";
import { Income } from "./incomes.interface";

export default class IncomesController implements IController {
  public path = "/income";
  router: Router = toAsyncRouter();
  private incomeService: IncomeService;
  isPrivate: boolean = true;

  constructor(incomeService: IncomeService) {
    this.incomeService = incomeService;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.findAll);
    this.router.post(this.path, this.create);
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
  }

  create = async (req: Request, res: Response) => {
    const { id: userId } = req.authUser;

    const expense: Income = req.body;
    let data = await this.incomeService.create({ ...expense, userId });

    res.json(data);
  };

  findAll = async (req: Request, res: Response) => {
    const { id: userId } = req.authUser;
    let { transactionGroupId, month, year } = req.query as {
      transactionGroupId: string;
      month: MonthType;
      year: string;
    };

    if (month && !MonthType[month.toUpperCase() as MonthType]) {
      throw new BadRequestError(
        "Month must be one of these values: " + Object.keys(MonthType)
      );
    }

    if (month) {
      month = month.toUpperCase() as MonthType;
    }

    const data = await this.incomeService.findAll(
      userId,
      transactionGroupId as string,
      month as string,
      year
    );

    res.json(data);
  };

  findOne = async (req: Request, res: Response): Promise<any> => {
    const { id: userId } = req.authUser;
    const { id } = req.params;
    const data = await this.incomeService.findOne(userId, id);

    res.send(data);
  };

  update = async (req: Request, res: Response): Promise<any> => {
    const { id: userId } = req.authUser;
    const { id } = req.params;
    const expense: Income = req.body;
    const data = await this.incomeService.update(userId, id, expense);

    res.send(data);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id: userId } = req.authUser;
    const { id } = req.params;
    const data = await this.incomeService.delete(userId, id);

    res.send(data);
  };
}
