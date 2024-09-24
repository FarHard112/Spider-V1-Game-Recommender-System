# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginxinc/nginx-unprivileged:stable-alpine as production-stage
COPY --from=build-stage /app/dist/angular-app/browser /usr/share/nginx/html
EXPOSE 8080
USER 101
CMD ["nginx", "-g", "daemon off;"]
