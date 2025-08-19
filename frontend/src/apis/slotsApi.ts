import api from "../config/axiosInstance";
import type { Slot } from "../types/models";

const createSlot = async (slot: Slot) => {
  try {
    return await api.post<Slot>("/slots", slot);
  } catch (e) {
    throw e;
  }
};
const updateSlot = async (slot: Slot) => {
  try {
    return await api.patch<Slot>("/slots/" + slot.id, slot);
  } catch (e) {
    throw e;
  }
};
const deleteSlot = async (id: string) => {
  try {
    return await api.delete("/slots/" + id);
  } catch (e) {
    throw e;
  }
};
const getServiceSlot = async (serviceId: string) => {
  try {
    return await api.get("/slots/" + serviceId);
  } catch (e) {
    throw e;
  }
};
const SlotsApi = {
  getServiceSlot,
  deleteSlot,
  updateSlot,
  createSlot,
};
export default SlotsApi;
