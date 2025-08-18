import { Router } from "express";
import ServicesController from "../controllers/services.controller";
import uploader from "../config/multer";

const route = Router();

route.get("", ServicesController.getAllServices);
route.post("", ServicesController.addService);
route.patch("/:id", uploader.single("image"), ServicesController.updateService);
route.delete("/:id", ServicesController.deleteService);
route.get("/image/:id", ServicesController.getServiceImage);
const ServicesRoute = route;
export default ServicesRoute;
