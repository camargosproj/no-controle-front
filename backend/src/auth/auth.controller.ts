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
    this.router.get(
      this.path + "/user/summary",
      authMiddleware,
      this.findUserSummary
    );
    this.router.post(this.path + "/singin", this.singIn);
    this.router.post(this.path + "/singup", this.singUp);
    this.router.post(this.path + "/validate", this.validate);
    this.router.post(this.path + "/send-code", this.sendVerificationCode);
    this.router.patch(this.path + "/reset-password", this.resetPassword);
    this.router.patch(this.path, authMiddleware, this.update);
  }

  findUserSummary = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.authUser;
    const userSummary = await this.authService.findUserSummary(id);
    res.status(200).json(userSummary);
  };

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

  validate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, code } = req.body;

    if (!email || !code) {
      throw new BadRequestError("Email and code are required");
    }

    await this.authService.validateUser(email, code);

    res.status(200).json();
  };

  sendVerificationCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError("Email is required");
    }

    await this.authService.sendVerificationCode(email);

    res.status(200).json();
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, code, oldPassword, newPassword } = req.body;

    if (!email || !code || !oldPassword || !newPassword) {
      throw new BadRequestError(
        "Email, code, old password and new password are required"
      );
    }

    await this.authService.resetPassword(email, code, oldPassword, newPassword);

    res.status(200).json();
  };
}
