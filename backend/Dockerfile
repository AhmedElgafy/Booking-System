FROM node:20.19.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
