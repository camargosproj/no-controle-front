import App from "./app";
import ExpensesController from "./expenses/expenses.controller";
import IncomesController from "./incomes/incomes.controller";
import "dotenv/config";

import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new ExpensesController(), new IncomesController()]);

app.listen();
