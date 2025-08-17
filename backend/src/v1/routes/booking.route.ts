import { Router } from "express";

const route = Router();
route.post("", () => {});
route.post("/me", () => {});
route.post("/:id/cancel", () => {});
const BookingRoute=route;
export default BookingRoute
