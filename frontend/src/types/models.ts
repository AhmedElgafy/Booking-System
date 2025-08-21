// Initial values for forms
export const initialCategory = {
  name: "",
};

export const initialService: Service = {
  title: "",
  description: "",
  image: undefined,
  imageUrl: "",
  providerId: "",
  categoryId: "",
  id: "",
  price: 0
};

export const initialSlot = {
  startTime: "",
  endTime: "",
  isBooked: false,
  serviceId: "",
};

export const initialBooking = {
  userId: "",
  slotId: "",
};
export interface Category {
  id?: string;
  name: string;
  services?: Service[];
}
export type BookingId = { bookingId: string };

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: File | null;
  imageUrl?: string | null;
  providerId: string;
  provider?: User;
  categoryId: string;
  //   category?: Category;
  //   slots?: Slot[];
  //   createdAt?: string;
  //   updatedAt?: string;
}

export interface Slot {
  id?: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  serviceId: string;
  // service?: Service;
  // booking?: Booking | null;
  // createdAt?: string;
  // updatedAt?: string;
}

export interface Booking {
  id?: string;
  userId: string;
  user?: User;
  slotId: string;
  slot?: Slot;
  createdAt?: string;
  updatedAt?: string;
}

export type Role = "USER" | "PROVIDER";

import type { User } from "./User";
