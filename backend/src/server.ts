import App from "./app";
import "dotenv/config";

import validateEnv from "./utils/validateEnv";
import CategoryModule from "./category/category.module";
import ExpenseModule from "./expenses/expense.module";
import IncomeModule from "./incomes/income.module";
import AppController from "./app.controller";

validateEnv();

const app = new App([
  new AppController(),
  new CategoryModule().controller,
  new ExpenseModule().controller,
  new IncomeModule().controller,
]);

app.listen();
