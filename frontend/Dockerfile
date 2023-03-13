FROM node:18.1.0-alpine3.14

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "start"]