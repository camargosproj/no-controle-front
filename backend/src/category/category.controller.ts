import { Request, Response, Router } from "express";
import CategoryService from "./category.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../@core/interfaces";

export default class CategoryController implements IController {
  path: string = "/category";
  router: Router = Router();
  categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.initializeRoutes();
  }
  create(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
  initializeRoutes(): void {
    this.router.get(this.path, this.findAll);
  }

  findAll = async (req: Request, res: Response) => {
    const data = await this.categoryService.findAll();
    res.json(data);
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
}
