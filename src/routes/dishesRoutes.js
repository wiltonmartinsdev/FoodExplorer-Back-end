import Router from "express";
import DishesController from "../controllers/DishesController.js";

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.post("/NewDish", dishesController.create);
dishesRoutes.get("/DishInformation/:Id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.put("/EditDish/:Id", dishesController.update);
dishesRoutes.delete("/EditDish/:Id", dishesController.delete);

export default dishesRoutes;
