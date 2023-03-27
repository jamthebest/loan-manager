FROM node:18.1.0-alpine3.14

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install nodemon --save-dev

COPY ./ ./

EXPOSE 8080

CMD ["nodemon", "--exec", "npm", "run", "start"]