import express from "express";
import cors from "cors";
import { z } from "zod";
import dotenv from "dotenv";
import V1Route from "./v1";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/v1", V1Route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
