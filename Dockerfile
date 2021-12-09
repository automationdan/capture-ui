# build env
FROM node:latest as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production env
FROM bitnami/nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /app

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
