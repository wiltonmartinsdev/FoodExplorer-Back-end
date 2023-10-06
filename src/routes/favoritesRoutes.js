import Router from "express";
import FavoritesController from "../controllers/FavoritesController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.delete("/:DishId", favoritesController.delete);

export default favoritesRoutes;
