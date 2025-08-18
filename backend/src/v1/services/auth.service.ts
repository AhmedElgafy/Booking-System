import { Prisma } from "@prisma/client";
import { User } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas from "../schemas/shemas";

const setUser = async (userNew: Omit<User, "id">): Promise<User> => {
  const user = await prisma.user.create({ data: userNew });
  return user;
};
const getUser = async (user: User): Promise<User|null> => {
  const existUser = await prisma.user.findUnique({
    where: { email: user.email, password: user.password },
  });
  return existUser;
};
const UserServices = {
  getUser,
  setUser,
};
export default UserServices;
