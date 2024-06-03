export class emailAlreadyExist extends Error {
  constructor() {
    super("E-mail already exist");
  }
}
