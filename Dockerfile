FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install 

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]