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
    res.send({ user: noPassUser, token: token }).status(200);
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
    const validUser = Schemas.LoginSchema.parse(req.body);
    const user = await UserServices.getUser(validUser as User);
    if (user) {
      const token = generateToken(user);
      res.setHeader("Authentication", token);
      return res.status(200).send({ token: token, user: user });
    } else {
      return res.status(404).send({ massage: "user is not exist" });
    }
  } catch (e) {
    next(e);
  }
};
const getMe = async (
  req: Request<{}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserServices.getMe(req.user.id);
    return res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};
const AuthController = {
  signUp,
  login,
  getMe,
};
export default AuthController;
