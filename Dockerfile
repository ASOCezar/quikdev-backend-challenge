FROM node:16.13-alpine3.12

RUN apk add --no-cache bash

USER node

EXPOSE 3000

WORKDIR /home/node/app