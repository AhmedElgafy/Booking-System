import { ZodError } from "zod";

export default class CustomZodError extends ZodError {
  constructor(name: string, message: string) {
    super([]);
    this.name = name;
    this.message = message;
    this._zod.def.push({
      code: "custom",
      path: [name],
      message: message,
    });
  }
}
