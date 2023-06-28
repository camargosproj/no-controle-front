import { NextFunction, Request, Response, Router } from "express";
import CategoryService from "./category.service";
import { IController } from "../core/interfaces";
import { toAsyncRouter } from "../middlewares/error.middleware";
import { BadRequestError, HttpError } from "../errors/custom-erros";

export default class CategoryController implements IController {
  path: string = "/category";
  router: Router = toAsyncRouter();
  categoryService: CategoryService;
  isPrivate: boolean = true;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
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
    const { name } = req?.body;
    if (!name) {
      throw new BadRequestError("Name is required");
    }
    throw new Error("Method not implemented.");
  };

  findAll = async (req: Request, res: Response) => {
    // @ts-ignore
    console.log(req.decoded);
    const data = await this.categoryService.findAll();
    res.json(data);
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.categoryService.findOne(req.params.id);
    if (!data) {
      throw new HttpError("Category not found", 404);
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
