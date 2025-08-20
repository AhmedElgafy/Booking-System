import api from "../config/axiosInstance";
import type { Booking, BookingId, Service } from "../types/models";

const createBooking = async (booking: Booking) => {
  try {
    await api.post("/booking", booking);
  } catch (e) {
    throw e;
  }
};
const getOwnBooking = async () => {
  try {
    return await api.get<(Service & BookingId)[]>("/booking/me");
  } catch (e) {
    throw e;
  }
};
const cancelBooking = async (id: string) => {
  try {
    const res = await api.patch(`/booking/${id}/cancel`);
  } catch (e) {
    throw e;
  }
};
const BookingApi = {
  createBooking,
  getOwnBooking,
  cancelBooking,
};
export default BookingApi;
