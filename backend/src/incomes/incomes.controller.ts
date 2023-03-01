import * as express from "express";
import { Income, AccountGroup } from "./incomes.interface";
import { prismaClient } from "../database/prismaClient";
import { SharedAccountGroup } from "@prisma/client";

class IncomesController {
  public path = "/incomes";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllincomes);
    this.router.get(this.path + "/by-group", this.getAllincomesByGroups);
    this.router.get(
      this.path + "/sharedgroups",
      this.getAllSharedGroupAccounts
    );
    this.router.post(this.path, this.createIncome);
    this.router.post(this.path + "/groupaccounts", this.createGroupAccount);
  }

  getAllincomes = async (
    request: express.Request,
    response: express.Response
  ) => {
    let data = await prismaClient.income.findMany({});

    response.send(data);
  };

  getAllincomesByGroups = async (
    request: express.Request,
    response: express.Response
  ) => {
    let data = await prismaClient.accountGroup.findMany({
      where: {
        Income: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },

      include: {
        Income: true,
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
        Income: {
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
            Income: true,
            groupOwner: true,
          },
        },
      },
    });

    response.send(data);
  };

  createIncome = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const income: Income = request.body;

      let data = await prismaClient.income.create({
        data: {
          ...income,
          date: new Date(income.date),
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

export default IncomesController;
