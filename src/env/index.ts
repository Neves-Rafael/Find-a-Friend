import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("production"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Invalid environment variable ❌❌❌", _env.error.format());

  throw new Error("Invalid environment variable");
}

export const env = _env.data;
