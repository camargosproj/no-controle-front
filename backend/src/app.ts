import * as express from "express";
import * as expressMonitor from "express-status-monitor";
import { IController } from "./core/interfaces";

class App {
  public app: express.Application;
  private controllers: IController[];

  constructor(controllers: IController[]) {
    this.controllers = controllers;
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
  }

  private initializeMiddlewares() {
    console.log("-- Starting middlewares");
    this.app.use(express.json());
    this.app.use(expressMonitor());
  }

  private initializeControllers() {
    this.controllers.forEach((controller) => {
      console.log(`-- Starting controller ${controller.path}`);
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    return this.app.listen(process.env.PORT || 3000, () => {
      console.log(`-- App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
