import { z } from "zod";

// ---------------- ENUMS ----------------
export const RoleEnum = z.enum(["USER", "PROVIDER"]);

// ---------------- USER ----------------
export const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: RoleEnum.default("USER"),
});

// For login
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});

// ---------------- SERVICE ----------------
export const ServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  providerId: z.string().cuid("Invalid user ID"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.instanceof(Buffer).optional(),
  categoryId: z.string().cuid("Invalid category ID"),
});

// ---------------- SLOT ----------------
export const SlotSchema = z.object({
  startTime: z.coerce.date(), // coerce allows string → Date
  endTime: z.coerce.date(),
  serviceId: z.string().cuid("Invalid service ID"),
});

// ---------------- BOOKING ----------------
export const BookingSchema = z.object({
  userId: z.string().cuid("Invalid user ID"),
  slotId: z.string().cuid("Invalid slot ID"),
});
export type ValidUser = z.infer<typeof UserSchema>;
export type ValidCategory = z.infer<typeof CategorySchema>;
export type ValidService = z.infer<typeof ServiceSchema>;
export type ValidSlot = z.infer<typeof SlotSchema>;
export type ValidBooking = z.infer<typeof BookingSchema>;
const Schemas = {
  BookingSchema,
  SlotSchema,
  ServiceSchema,
  LoginSchema,
  UserSchema,
};
export default Schemas;
