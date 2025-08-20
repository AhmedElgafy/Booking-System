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

![ERD placeholder](https://via.placeholder.com/800x400.png?text=ERD+goes+here)

> Replace this with your exported ERD image or embedded screenshot.

---

## Postman API Documentation

Comprehensive API collection with routes, request/response samples, and auth flows:

[View Booking System API Documentation in Postman](https://tabby2-0436.postman.co/workspace/Booking-System-API~52ea10d5-30b0-4cf7-8fde-5436d1d0bcb0/folder/27400850-61a4e2d1-1d30-4c49-a1cd-990f1ea233d8?action=share&creator=27400850&ctx=documentation)

---

## Getting Started

```bash
git clone <repo-url>
cd backend
npm install

# Create .env file with necessary configs (see below)
npx prisma migrate dev --name init
npx prisma generate

npm run dev
```

Then, start your frontend similarly under its directory (e.g., `npm run dev` for Next.js).

---

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
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
 └── [your React or Next.js app]
```

---

## Tech Stack

- **Backend**: Node.js, Express, Prisma ORM  
- **Database**: PostgreSQL (or MongoDB)  
- **Validation**: Zod  
- **Auth**: JWT (`jsonwebtoken`)  
- **Frontend**: React or Next.js (roles-based UI)  

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
