import { NextFunction, Request, Response } from "express";
import BookingService from "../services/booking.service";
import { scheduleReminder } from "../scheduler/reminder";
import prisma from "../config/db";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await BookingService.addBook(req.body);
    const slot = await prisma.slot.findUnique({
      where: { id: booking.slotId },
    });
    scheduleReminder({
      slotTime: slot?.endTime.toISOString() || "",
      userEmail: req.user.email,
      userName: req.user.name,
    });
    res.status(201).json(booking);
  } catch (error: any) {
    next(error);
  }
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const booking = await BookingService.getBooking(userId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error: any) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = req.params.id;
    await BookingService.cancelBooking(bookingId);
    res.json({ message: "Booking cancelled" });
  } catch (error: any) {
    next(error);
  }
};
const BookingController = {
  cancelBooking,
  getBooking,
  createBooking,
};
export default BookingController;
