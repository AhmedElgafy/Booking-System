import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import VerifyTokenMD from "../middlewares/verifyToken";

const route = Router();
route.post("/signup", AuthController.signUp);
route.post("/login", AuthController.login);
route.use(VerifyTokenMD);
route.get("/me", AuthController.getMe);
const AuthRoute = route;
export default AuthRoute;
