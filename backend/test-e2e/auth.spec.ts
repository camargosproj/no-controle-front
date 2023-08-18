import App from "../src/app";
import { setUpClient } from "./util";

import { Server } from "http";

import AuthModule from "../src/auth/auth.module";
import { SuperAgentTest } from "supertest";

describe("Auth", () => {
  let server: Server;
  let apiClient: SuperAgentTest;
  beforeAll(async () => {
    const app = new App([new AuthModule().controller]);
    server = app.listen();
    apiClient = setUpClient(server);
  });

  afterAll(async () => {
    server.close();
    server.removeAllListeners();
    console.log("Server closed");
  });

  it.only("should singin a user", async () => {
    const response = await apiClient
      .post("/auth/singin")
      .send({
        email: "dev@dev.com",
        password: "12345678",
      })
      .expect(200);

    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.name).toBe("dev");
  });
});
