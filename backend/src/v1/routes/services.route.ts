import { NextFunction, Request, Response, Router } from "express";
import ServicesController from "../controllers/services.controller";

const route = Router();

route.get("", ServicesController.getAllServices);
route.post("", ServicesController.addService);
route.patch("/:id", ServicesController.updateService);
route.delete("/:id", ServicesController.deleteService);
const ServicesRoute = route;
export default ServicesRoute;
