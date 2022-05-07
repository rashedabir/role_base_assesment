// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UsersController {
  public async signup({ auth, request, response }) {
    try {
      const userSchema = schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
        type: schema.string.nullableAndOptional(),
      });

      const payload = await request.validate({ schema: userSchema });
      const existingUser = await User.find(payload.email);
      if (existingUser) {
        return response.badRequest("user already exists");
      }

      const user = await User.create(payload);
      const token = await auth.use("api").generate(user);
      return response.json({ token: token.token });
    } catch (error) {
      response.badRequest(error);
    }
  }

  public async signin({ auth, request, response }) {
    try {
      const userSchema = schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      });

      const payload = await request.validate({ schema: userSchema });

      const user = await User.query()
        .where("email", payload.email)
        .firstOrFail();

      // Verify password
      if (!(await Hash.verify(user.password, payload.password))) {
        return response.badRequest("Invalid credentials");
      }

      const token = await auth.use("api").generate(user, {
        expiresIn: "7days",
      });

      response.cookie("bareer", token);

      return response.json({ token: token.token });
    } catch (error) {
      return response.badRequest("Invalid credentials");
    }
  }
}
