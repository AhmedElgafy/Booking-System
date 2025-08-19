// src/types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_API_BASE_URL: string;
  }
}

declare const VITE_API_BASE_URL: string;
