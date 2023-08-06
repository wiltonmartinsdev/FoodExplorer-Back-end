import Router from "express";
import usersRoutes from "./usersRoutes.js";

const routes = Router();

routes.use("/users", usersRoutes);

export default routes;
