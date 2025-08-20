import schedule, { Job } from "node-schedule";
import nodemailer from "nodemailer";
import prisma from "../config/db";

// --------------------
// Types
// --------------------

// --------------------
// Configure transporter
// --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD, // or use OAuth2 here
  },
});

// --------------------
// Schedule Reminder
// --------------------
interface Booking {
  slotTime: string;
  userEmail: string;
  userName: string;
}
export function scheduleReminder(booking: Booking): Job {
  const slotTime = new Date(booking.slotTime);
  const reminderTime = new Date(slotTime.getTime() - 30 * 60 * 1000);

  const job = schedule.scheduleJob(reminderTime, async () => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.userEmail,
        subject: "Booking Reminder",
        text: `Hi ${booking.userName}, your booking starts at ${booking.slotTime}.`,
      });
      console.log(`✅ Email sent to ${booking.userEmail}`);
    } catch (error) {
      console.error("❌ Failed to send email:", error);
    }
  });

  console.log(`📅 Reminder scheduled for ${reminderTime.toISOString()} - ${booking.userEmail}`);
  return job;
}

// --------------------
// Example Usage
// --------------------

export const refreshSchedule = async () => {
  async function getBookedSlotsFromToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of today
    console.log(today.toISOString());
    const slots = await prisma.slot.findMany({
      where: {
        isBooked: true,
        startTime: {
          gte: today,
        },
      },
      include: {
        service: true,
        booking: {
          include: {
            user: true,
          },
        },
      },
    });

    return slots;
  }
  const data = await getBookedSlotsFromToday();
  data.forEach((slot) => {
    const userName = slot.booking?.user.name || "";
    const userEmail = slot.booking?.user.email || "";
    const slotTime = slot.startTime.toISOString() || "";
    scheduleReminder({ slotTime, userEmail, userName });
  });
};

