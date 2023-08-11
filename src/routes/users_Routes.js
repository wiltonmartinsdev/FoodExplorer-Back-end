import Router from "express";
import Users_Controller from "../controllers/Users_Controller.js";

const users_Routes = Router();
const users_Controller = new Users_Controller();

users_Routes.post("/", users_Controller.create);

export default users_Routes;
