// src/types/User.ts

import type Roles from "./Roles";

export interface User {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: (typeof Roles)[number];
  //   services?: any[];
  //   bookings?: any[];
  //   createdAt?: string;
  //   updatedAt?: string;
}

export const singUp: Omit<User, "id"> = {
  name: "",
  email: "",
  password: "",
  role: "USER",
};
export const login: Omit<User, "id" | "name"> = {
  email: "",
  password: "",
};
const InitialUserValues = {
  singUp,
  login,
};
export default InitialUserValues
