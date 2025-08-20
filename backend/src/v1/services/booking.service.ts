import { Booking, Service, Slot } from "../../generated/prisma";
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
type BookingId = { bookingId: string };

type BookServices = Booking & {
  slot: { service: Service & BookingId };
};
const getBooking = async (userId: string) => {
  console.log(userId);
  // return await prisma.booking.findFirst({ where: { userId } });
  const res = await prisma.booking.findMany({
    where: { userId: userId },
    include: { slot: { include: { service: { omit: { image: true } } } } },
  });
  const bookingServices: any[] = res;
  let servicesArr = (bookingServices as BookServices[]).map((ele) => {
    return { ...ele.slot.service, bookingId: ele.id };
  });

  return servicesArr;
};
const cancelBooking = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  console.log(bookingId);
  if (booking) {
    await prisma.$transaction([
      prisma.slot.update({
        where: { id: booking?.slotId },
        data: { isBooked: false },
      }),
      prisma.booking.delete({ where: { id: bookingId } }),
    ]);
  }
  return;
};
const BookingService = {
  addBook,
  getBooking,
  cancelBooking,
};
export default BookingService;
