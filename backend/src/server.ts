import "dotenv/config";
import App from "./app";

import AppController from "./app.controller";
import AuthModule from "./auth/auth.module";
import CategoryModule from "./category/category.module";
import ExpenseModule from "./expenses/expense.module";
import IncomeModule from "./incomes/income.module";

const app = new App([
  new AppController(),
  new AuthModule().controller,
  new CategoryModule().controller,
  new ExpenseModule().controller,
  new IncomeModule().controller,
]);

app.listen();
