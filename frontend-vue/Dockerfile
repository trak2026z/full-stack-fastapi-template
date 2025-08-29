# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS build
WORKDIR /app

# instalacja zależności
COPY package*.json ./
RUN npm ci

# kopiowanie źródeł + build
COPY . .
RUN npm run build

# runtime: serwowanie przez nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
