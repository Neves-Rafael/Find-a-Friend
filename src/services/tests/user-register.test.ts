import { expect, test, describe } from "vitest";
import { UserRegisterService } from "../user-register";
import { compare } from "bcryptjs";

describe("create user", () => {
  test("Should hash user password upon registration", async () => {
    const registerService = new UserRegisterService({
      async findByEmail(email) {
        console.log(email);
        return null;
      },

      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerService.execute({
      name: "john Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrect = await compare("123456", user.password_hash);

    expect(isPasswordCorrect).toBe(true);
  });
});
