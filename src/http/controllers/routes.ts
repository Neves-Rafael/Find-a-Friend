import { FastifyInstance } from "fastify";
import { register } from "./user/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", register);
}
