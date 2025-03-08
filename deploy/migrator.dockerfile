FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY .prisma .prisma
COPY .env ./

RUN yarn

