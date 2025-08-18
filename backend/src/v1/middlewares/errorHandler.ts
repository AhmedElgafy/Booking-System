import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { JsonWebTokenError } from "jsonwebtoken";
import CustomZodError from "../utils/conflictError";

const errorHandlerMW = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    // if (err instanceof CustomZodError) {
    //   console.log(err.flatten(), err.format());
    //   res.status(400).send({
    //     ...err.flatten().fieldErrors,
    //     error_massage: err.format()._errors,
    //   });
    //   return;
    // }
    if (err instanceof ZodError) {
      console.log(err.flatten().fieldErrors);
      res.status(400).send({
        ...err.flatten().fieldErrors,
        error_massage: err.format()._errors,
      });
      return;
    }
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const errorField = (err.meta?.target as string[]).join(", ");
        return res.status(409).json({
          [errorField]: `This ${errorField} already exists.`,
        });
      }
      if (err.code === "P2025") {
        return res.status(404).json({
          message: "Record not found.",
        });
      }
      console.log(err);
      res.status(500).send({ message: "Database Error" });
      return;
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(401).send({ massage: "you have to login first" });
    }
    console.error(err);
    res.status(500).send({ message: "server error" });
    return;
  }
};
export default errorHandlerMW;
