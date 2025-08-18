import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { z, ZodError } from "zod";
import dotenv from "dotenv";
import V1Route from "./v1";
import { PrismaClientKnownRequestError } from "./generated/prisma/runtime/library";
import errorHandlerMW from "./v1/middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path);
  next();
});
app.use("/v1", V1Route);
app.use(errorHandlerMW);
app.use((req: Request, res: Response) => {
  res.status(404).send({ massage: "this route is not exist" });
  return;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
