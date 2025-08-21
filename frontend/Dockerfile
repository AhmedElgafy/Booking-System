FROM node:20.19.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Start frontend (Next.js)
CMD ["npm", "run", "dev"]
