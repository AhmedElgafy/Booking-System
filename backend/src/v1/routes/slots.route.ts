import { Router } from "express";
import {
  getServiceSlot,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../controllers/slots.controller";

const route = Router();
// Get slots by serviceId (query param)
route.get("/:id", getServiceSlot);
// Create a new slot
route.post("", createSlot);
// Update a slot by id
route.patch("/:id", updateSlot);
// Delete a slot by id
route.delete("/:id", deleteSlot);

const SlotsRoute = route;
export default SlotsRoute;
