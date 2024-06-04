import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/interfaces/user-repository-interface";

interface registerServiceParams {
  name: string;
  email: string;
  password: string;
}

export class UserRegisterService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ name, email, password }: registerServiceParams) {
    const password_hash = await hash(password, 6);

    const emailAlreadyExist = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new Error("E-mail already exist");
    }

    await this.usersRepository.create({ name, email, password_hash });
  }
}
