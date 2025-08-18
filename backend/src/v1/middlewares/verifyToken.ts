import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { User } from "../../generated/prisma";

const VerifyTokenMD = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const user = verifyToken<User>(token?.split(" ")[1] || "");
    // req.user
    if (user) {
      req.user = user;
    }
    next()
  } catch (e) {
    next(e);
  }
};
export default VerifyTokenMD;
