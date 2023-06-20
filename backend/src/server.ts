import App from "./app";
import "dotenv/config";

import validateEnv from "./utils/validateEnv";
import CategoryModule from "./category/category.module";
import ExpenseModule from "./expenses/expense.module";
import IncomeModule from "./incomes/income.module";

validateEnv();

const app = new App([
  new CategoryModule().controller,
  new ExpenseModule().controller,
  new IncomeModule().controller,
]);

app.listen();
