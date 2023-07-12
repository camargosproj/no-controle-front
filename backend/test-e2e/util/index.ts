import { Server } from "http";
import * as request from "supertest";

export const USER = {
  email: "dev@dev.com",
  password: "12345678",
};

export function setUpClient(server: Server) {
  return request.agent(server);
}

export async function login(
  client: request.SuperAgentTest,
  email: string,
  password: string
) {
  const { body } = await client.post("/auth/singin").send({
    email,
    password,
  });

  client.set("Authorization", `Bearer ${body.accessToken}`);

  return client;
}
