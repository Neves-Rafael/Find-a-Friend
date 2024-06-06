import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PetRegisterService } from "../../../services/pet-register";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";

export async function petRegister(request: FastifyRequest, reply: FastifyReply) {
  const petSchema = z.object({
    name: z.string(),
    age: z.number(),
    characteristics: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const { name, age, characteristics, latitude, longitude } = petSchema.parse(request.body);

  try {
    const petRepository = new PrismaPetRepository();
    const petRegisterService = new PetRegisterService(petRepository);

    petRegisterService.execute({
      name,
      age,
      characteristics,
      latitude,
      longitude,
    });
  } catch (error) {
    return error;
  }

  return reply.send();
}
