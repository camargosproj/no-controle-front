import { Request, Response, Router } from "express";

export interface IController {
  path: string;
  router: Router;
  initializeRoutes(): void;
  create(req: Request, res: Response): void;
  findAll(req: Request, res: Response);
  findOne(req: any, res: any);
  update(req: Request, res: Response);
  delete(req: Request, res: Response): void;
}
