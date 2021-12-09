# build env
FROM node:latest as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production env
FROM bitnami/nginx:latest

COPY --from=builder /usr/src/app/build /app
USER 1001

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
