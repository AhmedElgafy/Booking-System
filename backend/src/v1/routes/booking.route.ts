import { Router } from "express";
import BookingController from "../controllers/booking.controller";

const route = Router();
route.post("", BookingController.createBooking);
route.get("/me", BookingController.getBooking);
route.patch("/:id/cancel", BookingController.cancelBooking);
const BookingRoute = route;
export default BookingRoute;
