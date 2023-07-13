import * as express from "express";
import * as expressMonitor from "express-status-monitor";
import { IController } from "./core/interfaces";
import { errorHandler } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import * as cors from "cors";
class App {
  public app: express.Application;
  private controllers: IController[];

  constructor(controllers: IController[]) {
    this.controllers = controllers;
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    console.log("-- Starting middlewares");
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(expressMonitor());
    this.initializePublicControllers();
    // Auth middleware
    this.app.use(authMiddleware);
  }

  private initializeErrorHandling() {
    console.log("-- Starting error handling");
    this.app.use(errorHandler);
  }

  private initializeControllers() {
    this.controllers.forEach((controller) => {
      if (controller.isPrivate) {
        console.log(`-- Starting controller ${controller.path}`);
        this.app.use("/", controller.router);
      }
    });
  }

  private initializePublicControllers() {
    this.controllers.forEach((controller) => {
      if (!controller.isPrivate) {
        console.log(`-- Starting controller ${controller.path}`);
        this.app.use("/", controller.router);
      }
    });
  }

  public listen() {
    return this.app.listen(process.env.PORT || 3000, () => {
      console.log(`-- App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
