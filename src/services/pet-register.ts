import { PetRepository } from "../repositories/interfaces/pet-repository-interface";
import { Decimal } from "@prisma/client/runtime/library";

interface PetRegisterServiceParams {
  name: string;
  age: number;
  characteristics: string;
  latitude: Decimal;
  longitude: Decimal;
}

export class PetRegisterParams {
  constructor(private petsRepository: PetRepository) {}

  async execute({ name, age, characteristics, latitude, longitude }: PetRegisterServiceParams) {
    await this.petsRepository.create({
      name,
      age,
      characteristics,
      latitude,
      longitude,
      // TODO: adjust org param
      org: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined,
      },
    });
  }
}
