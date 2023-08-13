import Router from "express";
import DishesController from "../controllers/DishesController.js";

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/NewDish", dishesController.create);
dishesRoutes.put("/EditDish/:Id", dishesController.update);
dishesRoutes.get("/DishInformation/:Id", dishesController.show);

export default dishesRoutes;
