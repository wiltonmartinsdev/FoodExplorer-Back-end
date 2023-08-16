import Router from "express";
import DishesController from "../controllers/DishesController.js";
import DishImageController from "../controllers/DishImageController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";
import multer from "multer";
import * as uploadConfig from "../configs/upload.js";

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishImageControllers = new DishImageController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/NewDish", dishesController.create);
dishesRoutes.get("/DishInformation/:Id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.put("/EditDish/:Id", dishesController.update);
dishesRoutes.delete("/EditDish/:Id", dishesController.delete);
dishesRoutes.patch(
	"/image",
	ensureAuthenticated,
	upload.single("Image", dishImageControllers.update)
);

export default dishesRoutes;
