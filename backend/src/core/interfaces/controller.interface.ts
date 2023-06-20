import { Request, Response, Router } from "express";

export interface IController {
  path: string;
  router: Router;
  initializeRoutes(): void;
  create(req: Request, res: Response): void;
  findAll(req: Request, res: Response);
  findOne(req: Request, res: Response, id: string): Promise<any | null>;
  update(req: Request, res: Response, id: string): Promise<void>;
  delete(req: Request, res: Response, id: string): void;
}
