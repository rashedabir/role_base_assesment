import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthMentor {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = await auth.user;
    if (user?.type !== "mentor") {
      return response.badRequest("Invalid Auth Mentor");
    }

    await next();
  }
}
