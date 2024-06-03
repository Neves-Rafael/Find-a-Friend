import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = userSchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const emailAlreadyExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailAlreadyExist) {
    return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });

  return reply.send();
}
