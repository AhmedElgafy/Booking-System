// import { User } from "@prisma/client";
import { Request } from "express";
import { Express } from "express";
import { User } from "../../generated/prisma";
declare global {
  namespace Express {
    interface Request {
      user: User; // or just `any` if you haven't typed it
    }
  }
}
export {}