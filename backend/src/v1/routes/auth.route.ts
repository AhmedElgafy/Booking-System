import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const route = Router();
route.post("/signup", AuthController.signUp);
route.post("/login", AuthController.login);
const AuthRoute = route;
export default AuthRoute;
