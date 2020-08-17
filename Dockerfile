FROM node:13.10.1

WORKDIR /app

COPY . /app

RUN apt-get update

RUN apt-get -y install libreoffice

RUN npm i

ENTRYPOINT npm run start