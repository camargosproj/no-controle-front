import * as express from "express";
import * as expressMonitor from "express-status-monitor";

class App {
  public app: express.Application;

  constructor(controllers) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(expressMonitor());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
