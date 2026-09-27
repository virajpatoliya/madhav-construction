FROM node:20-alpine AS build
WORKDIR /app

COPY madhavConstruction-frontend/package.json madhavConstruction-frontend/package-lock.json ./
RUN npm ci

COPY madhavConstruction-frontend/ ./
RUN npm run build

FROM nginx:1.27-alpine
COPY madhavConstruction-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
