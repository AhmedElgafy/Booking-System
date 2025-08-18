import { Router } from "express";
import AuthRoute from "./routes/auth.route";
import ServicesRoute from "./routes/services.route";
import SlotsRoute from "./routes/slots.route";
import BookingRoute from "./routes/booking.route";
import VerifyTokenMD from "./middlewares/verifyToken";

const route = Router();
route.use("/auth", AuthRoute);
route.use(VerifyTokenMD);
route.use("/services", ServicesRoute);
route.use("/slots", SlotsRoute);
route.use("/bookings", BookingRoute);
const V1Route = route;
export default V1Route;
