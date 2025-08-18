import { Request, Response, NextFunction } from "express";
import SlotService from "../services/slots.services";
import Schemas from "../schemas/shemas";

// Get slots by serviceId
export const getServiceSlot = async (
  req: Request<{}, {}, {}, { serviceId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const slots = await SlotService.getSlotByService(req.query.serviceId);
    return res.status(200).send(slots);
  } catch (e) {
    next(e);
  }
};

// Create a new slot
export const createSlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slot = await SlotService.createSlot(req.body);
    return res.status(201).send(slot);
  } catch (e) {
    next(e);
  }
};

// Update a slot
export const updateSlot = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const slot = await SlotService.updateSlot(req.params.id, req.body);
    return res.status(200).send(slot);
  } catch (e) {
    next(e);
  }
};

// Delete a slot
export const deleteSlot = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await SlotService.deleteSlot(req.params.id);
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};
