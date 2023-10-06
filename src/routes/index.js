import Router from "express";
import sessionsRoutes from "./sessionsRoutes.js";
import usersRoutes from "./usersRoutes.js";
import dishesRoutes from "./dishesRoutes.js";
import favoritesRoutes from "./favoritesRoutes.js";

const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);
routes.use("/admin", dishesRoutes);
routes.use("/favorites", favoritesRoutes);

export default routes;
