import * as express from "express";
import { Expense, AccountGroup } from "./expenses.interface";
import { prismaClient } from "../database/prismaClient";
import { SharedAccountGroup } from "@prisma/client";

class ExpensesController {
  public path = "/expense";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllExpenses);
    this.router.get(this.path + "/by-group", this.getAllExpensesByGroups);
    this.router.get(
      this.path + "/sharedgroups",
      this.getAllSharedGroupAccounts
    );
    this.router.post(this.path, this.createExpense);
    this.router.post(this.path + "/groupaccounts", this.createGroupAccount);
  }

  getAllExpenses = async (
    request: express.Request,
    response: express.Response
  ) => {
    let data = await prismaClient.expense.findMany({});

    response.send(data);
  };

  getAllExpensesByGroups = async (
    request: express.Request,
    response: express.Response
  ) => {
    let data = await prismaClient.accountGroup.findMany({
      where: {
        Expense: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
      include: {
        Expense: true,
      },
    });

    response.send(data);
  };

  getAllSharedGroupAccounts = async (
    request: express.Request,
    response: express.Response
  ) => {
    let data = await prismaClient.sharedAccountGroup.findMany({
      where: {
        Expense: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
      include: {
        sharedWith: true,
        accountGroup: {
          include: {
            Expense: true,
            groupOwner: true,
          },
        },
      },
    });

    response.send(data);
  };

  createExpense = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const expense: Expense = request.body;

      let data = await prismaClient.expense.create({
        data: {
          ...expense,
          date: new Date(expense.date),
        },
      });
      response.send(data);
    } catch (e) {
      console.log(e);
      response.status(500).json({
        message: e.message,
      });
      return;
    }
  };

  createGroupAccount = async (
    request: express.Request,
    response: express.Response
  ) => {
    const accountGroup: AccountGroup = request.body;
    let data = await prismaClient.accountGroup.create({
      data: accountGroup,
    });
    response.send(data);
  };
}

export default ExpensesController;
