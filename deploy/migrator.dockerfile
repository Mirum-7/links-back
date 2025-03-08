FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

COPY .prisma .prisma
COPY .env ./
