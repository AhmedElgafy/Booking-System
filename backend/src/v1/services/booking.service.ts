import { Booking } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas from "../schemas/shemas";

const addBook = async (newBooking: Booking) => {
  const validBooking = Schemas.BookingSchema.parse(newBooking);
  const result = await prisma.$transaction([
    prisma.slot.update({
      where: { id: validBooking.slotId, isBooked: false },
      data: { isBooked: true },
    }),
    prisma.booking.create({ data: validBooking }),
  ]);
  return result[1];
};
const getBooking = async (userId: string) => {
  return await prisma.booking.findFirst({ where: { userId } });
};
const cancelBooking = async (bookingId: string) => {
  return await prisma.booking.delete({ where: { id: bookingId } });
};
const BookingService = {
  addBook,
  getBooking,
  cancelBooking,
};
export default BookingService;
