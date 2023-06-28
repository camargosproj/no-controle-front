import { NextFunction, Request, Response, Router } from "express";

export interface IController {
  path: string;
  router: Router;
  initializeRoutes(): void;
  create(req: Request, res: Response, next: NextFunction): void;
  findAll(req: Request, res: Response, next: NextFunction);
  findOne(req: Request, res: Response, next: NextFunction);
  update(req: Request, res: Response, next: NextFunction);
  delete(req: Request, res: Response, next: NextFunction): void;
}
