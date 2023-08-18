import App from "../src/app";
import AppController from "../src/app.controller";
import CategoryModule from "../src/category/category.module";
import { Server } from "http";
import ExpenseModule from "../src/expenses/expense.module";
import IncomeModule from "../src/incomes/income.module";
import { SuperAgentTest } from "supertest";
import { USER, login, setUpClient } from "./util";
import AuthModule from "../src/auth/auth.module";

describe("Category", () => {
  let server: Server;
  let apiClient: SuperAgentTest;
  beforeAll(async () => {
    const app = new App([
      new AppController(),
      new AuthModule().controller,
      new CategoryModule().controller,
      new ExpenseModule().controller,
      new IncomeModule().controller,
    ]);
    server = app.listen();
    apiClient = setUpClient(server);
    apiClient = await login(apiClient, USER.email, USER.password);
  });

  afterAll(async () => {
    server.close();
    server.removeAllListeners();
    console.log("Server closed");
  });

  it("should get all categories", async () => {
    const response = await apiClient.get("/category").expect(200);

    expect(response.body[0]).toHaveProperty("name");
    // Expect this obj
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
      })
    );
  });
  // it("should get one category by Id", async () => {
  //   const categoryId = "12wsrt-12wsrt-12wsrt-12wsrt-12wsrt";
  //   const response = await request(server)
  //     .get(`/category/${categoryId}`)
  //     .expect(200);
  //   console.log(response.body);
  // });
});
