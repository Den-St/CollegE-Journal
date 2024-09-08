FROM node:14-alpine as build

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install --production

ENV GENERATE_SOURCEMAP=false
COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV REACT_APP_API_URL=http://localhost:80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

