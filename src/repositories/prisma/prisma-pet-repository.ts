import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PetRepository } from "../interfaces/pet-repository-interface";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
