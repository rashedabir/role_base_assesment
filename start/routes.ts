import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/signup", "UsersController.signup");
  Route.post("/signin", "UsersController.signin");
}).prefix("/user");

Route.get("/", async () => {
  return { hello: "world" };
}).middleware(["auth", "authAdmin"]);
