# build env
FROM node:latest as builder
WORKDIR /usr/src/app
COPY package*.json ./
ENV REACT_APP_DCAPPROXY=http://datacap-api:8080
RUN npm ci
COPY . ./
RUN npm run build

# production env
FROM bitnami/nginx:latest

COPY --from=builder /usr/src/app/build /opt/app-root/src
USER 1001

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
