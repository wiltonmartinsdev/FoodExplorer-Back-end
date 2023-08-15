import Router from "express";
import sessionsRoutes from "./sessionsRoutes.js";
import usersRoutes from "./usersRoutes.js";
import dishesRoutes from "./dishesRoutes.js";

const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);
routes.use("/admin", dishesRoutes);

export default routes;
