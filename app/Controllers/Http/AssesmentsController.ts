// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AssesmentsController {
  public async signup({ auth, request, response }) {
    try {
      const assesmentSchema = schema.create({
        title: schema.string(),
        description: schema.string(),
        grade: schema.string(),
      });

      const payload = await request.validate({ schema: assesmentSchema });
      const user = await auth.user;
      const assesment = {
        title: payload.title,
        description: payload.description,
        grade: payload.grade,
        user: user.id,
      };

      return response.json(assesment);
    } catch (error) {
      response.badRequest(error);
    }
  }
}
