FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN npm yarn

COPY .prisma .prisma
COPY .env ./
