import { Router } from "express";
import AuthRoute from "./routes/auth.route";
import ServicesRoute from "./routes/services.route";
import SlotsRoute from "./routes/slots.route";
import BookingRoute from "./routes/booking.route";
import VerifyTokenMD from "./middlewares/verifyToken";
import ServicesController from "./controllers/services.controller";
import CategoryRout from "./routes/category.route";

const route = Router();
route.use("/auth", AuthRoute);
route.get("/service/image/:id", ServicesController.getServiceImage);
route.use(VerifyTokenMD);
route.use("/services", ServicesRoute);
route.use("/slots", SlotsRoute);
route.use("/booking", BookingRoute);
route.use("/categories", CategoryRout);
const V1Route = route;
export default V1Route;
