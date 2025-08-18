import { Slot } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas, { ValidSlot } from "../schemas/shemas";

const getSlotByService = async (serviceId: string) => {
  return await prisma.slot.findMany({ where: { serviceId: serviceId } });
};
const createSlot = async (newSlot: Slot) => {
  const validSlot = Schemas.SlotSchema.parse(newSlot);
  const slot = await prisma.slot.create({ data: validSlot });
  return slot;
};
const updateSlot = async (slotId: string, oldSlot: Slot) => {
  const validSlot = Schemas.SlotSchema.partial().parse(oldSlot);
  const slot = await prisma.slot.update({
    where: { id: slotId },
    data: validSlot,
  });
  return slot;
};
const deleteSlot = async (slotId: string) => {
  return await prisma.slot.delete({ where: { id: slotId } });
};
const SlotService = {
  deleteSlot,
  getSlotByService,
  updateSlot,
  createSlot,
};
export default SlotService;
