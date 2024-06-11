import { expect, test, describe } from "vitest";
import { UserRegisterService } from "../user-register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExist } from "../../erros/email-already-exist-error";

describe("create user service", () => {
  test("Should be able to register", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerService = new UserRegisterService(inMemoryUsersRepository);

    const { user } = await registerService.execute({
      name: "john Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("Should hash user password upon registration", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerService = new UserRegisterService(inMemoryUsersRepository);

    const { user } = await registerService.execute({
      name: "john Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrect = await compare("123456", user.password_hash);

    expect(isPasswordCorrect).toBe(true);
  });

  test("Should not create a already existent email", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerService = new UserRegisterService(inMemoryUsersRepository);

    const email = "johndoe@example.com";

    await registerService.execute({
      name: "john Doe",
      email,
      password: "123456",
    });

    expect(async () => {
      await registerService.execute({
        name: "john Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(EmailAlreadyExist);
  });
});
