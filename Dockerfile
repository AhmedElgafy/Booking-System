FROM node:20.19.3-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .
RUN npx prisma generate

FROM node:20.19.3-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run dev

# This just runs backend; frontend must be served separately
CMD ["npm", "run", "dev", "--prefix", "backend"]
