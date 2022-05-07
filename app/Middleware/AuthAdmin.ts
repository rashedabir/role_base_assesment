import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthAdmin {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = await auth.user;
    if (user?.type !== "admin") {
      return response.badRequest("Invalid Auth Admin");
    }

    await next();
  }
}
