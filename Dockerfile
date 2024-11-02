# Use Node.js for building the app
FROM node:14 AS builder

RUN npm install
COPY . .
RUN npm run build
