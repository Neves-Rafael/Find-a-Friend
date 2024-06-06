import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/interfaces/user-repository-interface";
import { EmailAlreadyExist } from "../erros/email-already-exist-error";

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
      throw new EmailAlreadyExist();
    }

    await this.usersRepository.create({ name, email, password_hash });
  }
}
