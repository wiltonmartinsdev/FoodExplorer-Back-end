import Router from "express";
import users_Routes from "./users_Routes.js";
import dishes_Routes from "./dishes_Routes.js";

const routes = Router();

routes.use("/users", users_Routes);
routes.use("/admin", dishes_Routes);

export default routes;
