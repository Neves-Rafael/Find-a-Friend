import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../interfaces/user-repository-interface";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const userEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userEmail;
  }
}
