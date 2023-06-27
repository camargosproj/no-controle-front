import * as request from "supertest";
import App from "../src/app";
import AppController from "../src/app.controller";
import CategoryModule from "../src/category/category.module";
import { Server } from "http";
import ExpenseModule from "../src/expenses/expense.module";
import IncomeModule from "../src/incomes/income.module";

describe("Category", () => {
  let server: Server;
  beforeAll(async () => {
    const app = new App([
      new AppController(),
      new CategoryModule().controller,
      new ExpenseModule().controller,
      new IncomeModule().controller,
    ]);
    server = app.listen();
  });

  afterAll(async () => {
    server.close();
    console.log("Server closed");
  });

  it("should get all categories", async () => {
    const response = await request(server).get("/category").expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
    });
  });
  it("should get one category by Id", async () => {
    const categoryId = "12wsrt-12wsrt-12wsrt-12wsrt-12wsrt";
    const response = await request(server)
      .get(`/category/${categoryId}`)
      .expect(200);
    console.log(response.body);
  });
});
