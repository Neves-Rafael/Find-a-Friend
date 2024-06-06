import fastify from "fastify";
import { appRoutes } from "./http/controllers/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here send to external log framework (dataDog, newrelic, sentry)
  }

  return reply.status(500).send({ message: "Internal Server Error 😵" });
});
