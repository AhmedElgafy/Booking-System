import { User } from "../generated/prisma";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string;
      PRISMA_DATABASE_URL: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};
