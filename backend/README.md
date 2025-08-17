# Express TypeScript Backend

This project is a simple Express backend using TypeScript, nodemon, zod, and cors.

## Scripts
- `npm run dev` — Start the server in development mode with nodemon
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Start the compiled server

## Endpoints
- `GET /` — Returns Hello World
- `POST /validate` — Validates JSON body `{ name: string, age: number }` using zod
