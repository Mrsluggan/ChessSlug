# Base image
FROM node:14 AS builder
WORKDIR /chessslug

# Copy files and install dependencies
COPY . .
RUN npm install

# Run build
RUN npm run build

# Production image
FROM node:14
WORKDIR /app
COPY --from=builder /app/build /app/build
