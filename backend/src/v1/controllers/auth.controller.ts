import { NextFunction, Request, Response, Router } from "express";
import UserServices from "../services/auth.service";
import { User } from "../../generated/prisma";
import Schemas from "../schemas/shemas";
import { generateToken } from "../utils/token";

const signUp = async (
  req: Request<{}, Omit<User, "id">>,
  res: Response,
  next: NextFunction
) => {
  try {
    const validUser = Schemas.UserSchema.parse(req.body);
    const user = await UserServices.setUser(validUser as User);
    const noPassUser: Partial<User> = user;
    delete noPassUser.password;
    const token = generateToken(user);
    res.setHeader("Authentication", token);
    res.setHeader(
      "Set-Cookie",
      `token=${token}; Max-Age=${24 * 60 * 60 * 1000}`
    );
    res.send(noPassUser).status(200);
    return;
  } catch (e) {
    next(e);
  }
};
const login = async (
  req: Request<{}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const validUser = Schemas.UserSchema.parse(req.body);
    const user = await UserServices.getUser(validUser as User);
    if (user) {
      const token = generateToken(user);
      res.setHeader("Authentication", token);
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Max-Age=${24 * 60 * 60 * 1000}`
      );
      return res.status(200).send({ token: token });
    } else {
      return res.status(400).send({ massage: "user is not exist" });
    }
  } catch (e) {
    next(e);
  }
};
const AuthController = {
  signUp,
  login,
};
export default AuthController;
