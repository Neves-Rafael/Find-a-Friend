import { PetRepository } from "../repositories/interfaces/pet-repository-interface";

interface PetRegisterServiceParams {
  name: string;
  age: number;
  characteristics: string;
  latitude: number;
  longitude: number;
  org_id: string;
}

export class PetRegisterService {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    name,
    age,
    characteristics,
    latitude,
    longitude,
    org_id,
  }: PetRegisterServiceParams) {
    await this.petsRepository.create({
      name,
      age,
      characteristics,
      latitude,
      longitude,
      org: org_id,
    });
  }
}
