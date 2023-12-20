FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ENV REACT_APP_API_URL=http://localhost:3000
EXPOSE 3000
CMD ["npm", "start"]
