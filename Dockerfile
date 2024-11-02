# Use Node.js for building the app
FROM node:14 AS builder

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
