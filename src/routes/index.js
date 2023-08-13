import Router from "express";
import usersRoutes from "./usersRoutes.js";
import dishesRoutes from "./dishesRoutes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/admin", dishesRoutes);

export default routes;
