import Router from "express";
import Dishes_Controller from "../controllers/Dishes_Controller.js";

const dishes_Routes = Router();
const dishes_Controller = new Dishes_Controller();

dishes_Routes.post("/newDish", dishes_Controller.create);
dishes_Routes.put("/editDish/:ID", dishes_Controller.update);

export default dishes_Routes;
