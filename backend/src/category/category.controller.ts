import { Request, Response, Router } from "express";
import CategoryService from "./category.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../core/interfaces";

export default class CategoryController implements IController {
  path: string = "/category";
  router: Router = Router();
  categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.findAll);
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
  }

  create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) => {
    throw new Error("Method not implemented.");
  };

  findAll = async (req: Request, res: Response) => {
    const data = await this.categoryService.findAll();
    res.json(data);
  };

  findOne = async (req: Request, res: Response) => {
    const data = await this.categoryService.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(data);
  };

  update = async (req: Request, res: Response) => {
    const data: any = await this.categoryService.update(
      req.params.id,
      req.body
    );
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(data);
  };

  delete = async (req: Request, res: Response) => {
    const category = await this.categoryService.delete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted" });
  };
}
