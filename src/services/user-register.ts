import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/interfaces/user-repository-interface";
import { EmailAlreadyExist } from "../erros/email-already-exist-error";
import { User } from "@prisma/client";

interface registerServiceParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: User;
}

export class UserRegisterService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerServiceParams): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6);

    const emailAlreadyExist = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new EmailAlreadyExist();
    }

    const user = await this.usersRepository.create({ name, email, password_hash });

    return { user };
  }
}
