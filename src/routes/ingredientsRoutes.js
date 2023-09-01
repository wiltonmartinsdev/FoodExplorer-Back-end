import Router from "express";
import IngredientsController from "../controllers/IngredientsController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.delete("/Ingredient/:Id", ingredientsController.delete);

export default ingredientsRoutes;
