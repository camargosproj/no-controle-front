import { Router, Request, Response, NextFunction } from "express";
import { IController } from "../core/interfaces";
import { toAsyncRouter } from "../middlewares/error.middleware";
import AuthService from "./auth.service";
import { BadRequestError } from "../errors/custom-erros";
import { authMiddleware } from "../middlewares/auth.middleware";

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
    throw new Error("Method not implemented.");
  };
}
