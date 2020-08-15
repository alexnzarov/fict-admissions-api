FROM node:13.10.1

WORKDIR /app

COPY . /app

RUN npm i

ENTRYPOINT npm run start