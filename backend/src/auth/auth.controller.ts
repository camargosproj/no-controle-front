import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../core/interfaces";
import { BadRequestError } from "../errors/custom-errors";
import { authMiddleware } from "../middlewares/auth.middleware";
import { toAsyncRouter } from "../middlewares/error.middleware";
import AuthService from "./auth.service";

export default class AuthController implements IController {
  path: string = "/auth";
  router: Router = toAsyncRouter();
  authService: AuthService;
  isPrivate: boolean = false;
  constructor(authService: AuthService) {
    this.authService = authService;
    this.initializeRoutes();
  }
  initializeRoutes(): void {
    this.router.post(this.path + "/singin", this.singIn);
    this.router.post(this.path + "/singup", this.singUp);
    this.router.patch(this.path, authMiddleware, this.update);
  }
  singIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await this.authService.singIn(email, password);

    res.status(200).json(user);
  };

  singUp = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      throw new BadRequestError("Name, Email and password are required");
    }
    const user = await this.authService.singUp(name, email, password);
    res.status(200).json(user);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.authUser;
    const { name, email, password } = req.body;

    const user = await this.authService.updateUser(id, name, email, password);

    res.status(200).json(user);
  };
}
