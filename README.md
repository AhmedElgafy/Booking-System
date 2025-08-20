# Booking System – Full‑Stack Project

A role-based booking platform for online consultation services, allowing **Providers** to define service slots and **Users** to book them securely. The project includes JWT authentication, Prisma ORM, role-based authorization, conflict‑free time slots, and binary image storage.

---

##  Table of Contents

- [Features](#features)  
- [Architecture Overview](#architecture-overview)  
- [ERD](#erd)  
- [Postman API Documentation](#postman-api-documentation)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Structure](#structure)  
- [Tech Stack](#tech-stack)  
- [Error Handling](#error-handling)  
- [Authorization](#authorization)  
- [Slot Conflict Prevention](#slot-conflict-prevention)  
- [Contribution](#contribution)  
- [License](#license)

---

## Features

- **Authentication** with JWT (login/signup)  
- **Role‑based authorization** (`USER`, `PROVIDER`)  
- **CRUD Services** (with image as binary data) by providers  
- **Slot Management** ensuring no time overlaps  
- **Booking System** for users to reserve slots  
- **Validation** via Zod for clean request handling  
- **Error handling** including Prisma unique & foreign key constraints  

---

## Architecture Overview

- **Backend**: Node.js + Express, Prisma ORM, PostgreSQL (or MongoDB)  
- **Frontend**: React or Next.js (choose per your preference)  
- **Auth**: JWT tokens with roles embedded  
- **Validation**: Zod schemas for request bodies  
- **Error handling middleware**: Handles validation, unique (P2002), foreign key (P2003), and default server errors  

---

## ERD

An Entity‑Relationship Diagram illustrating the schema (Users, Services, Categories, Slots, Bookings):

![Description of the image](https://github.com/user-attachments/assets/58d19bfc-b9a4-462f-92a0-58398b59f34b)

> Replace this with your exported ERD image or embedded screenshot.

---

## Postman API Documentation

Comprehensive API collection with routes, request/response samples, and auth flows:

[View Booking System API Documentation in Postman](https://documenter.getpostman.com/view/27400850/2sB3BKFoao)

---

## Getting Started Backend

```bash
git clone <repo-url>
cd backend
npm install

# Create .env file with necessary configs (see below)
npx prisma migrate dev --name init
npx prisma generate

npm run dev
```
Then, start your frontend similarly under its directory 
```bash
cd frontend
npm install

# Create .env file with necessary configs (see below)

npm run dev
```
---

## Environment Variables

```env
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=30001
FRONT_BASE_URL="http://localhost:5173" #For Cors
# Frontend
VITE_API_BASE_URL=http://localhost:3001/v1
```

---

## Structure

```
/backend
 ├── src
 │    ├── controllers
 │    ├── services
 │    ├── middlewares
 │    ├── validation
 │    ├── prisma
 │    └── index.ts
 └── schema.prisma

/frontend
 └── [React]
```

---

## Tech Stack

- **Backend**: Node.js, Express, Prisma ORM  
- **Database**: PostgreSQL (or MongoDB)  
- **Validation**: Zod , Yup
- **Auth**: JWT (`jsonwebtoken`)  
- **Frontend**: React (roles-based UI), Redux, Axios

---

## Error Handling

- `400 Bad Request`: Zod validation errors  
- `409 Conflict`: Prisma unique constraint (P2002)  
- `400 Bad Request`: Prisma foreign key constraint (P2003)  
- `500 Internal Server Error`: All other errors  

---

## Authorization

- **JWT** token includes `role`: `"USER"` or `"PROVIDER"`  
- **Backend**: `requireRole(...)` middleware restricts endpoints per role  
- **Frontend**: UI rendered conditionally—only providers can create services; users can book slots  

---

## Slot Conflict Prevention

Before creating a slot, the backend checks for overlapping times on the same `serviceId`:

```ts
where: {
  serviceId,
  AND: [
    { startTime: { lt: newSlotEnd } },
    { endTime: { gt: newSlotStart } },
  ],
}
```

This ensures no two slots overlap for the same service.

---

## Contribution

Contributions are welcome! Feel free to open issues or make pull requests to:

- Add unit/integration tests  
- Improve role‑based frontend routing  
- Refactor UI for better UX  

---

## License

[MIT License](LICENSE)
