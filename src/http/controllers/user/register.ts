import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserRegisterService } from "../../../services/user-register";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { EmailAlreadyExist } from "../../../erros/email-already-exist-error";

export async function userRegister(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = userSchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const userRegisterService = new UserRegisterService(userRepository);

    userRegisterService.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExist) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
