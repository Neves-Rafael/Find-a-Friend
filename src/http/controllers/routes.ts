import { FastifyInstance } from "fastify";
import { userRegister } from "./user/register";
import { petRegister } from "./pet/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
  app.post("/pet/register", petRegister);
}
