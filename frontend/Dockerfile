FROM node:22.14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "serve", "-s", "dist", "-p", "8000"]