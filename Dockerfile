# Stage 1: Build the Angular application
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache zip && npm i

COPY . .
RUN npm run-script update-version --release_version=$(cat release-version.txt)
RUN npm run build

RUN mkdir -p /build \
    && cd /app/dist/iep-servicemonitor-ui \
    && zip -r /build/iep-servicemonitor-ui.zip .

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS deploy

COPY --from=build /app/dist/iep-servicemonitor-ui /usr/share/nginx/html
COPY --from=build /build/iep-servicemonitor-ui.zip /build/iep-servicemonitor-ui.zip
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.config.js.template /etc/nginx/templates/env.config.js.template
COPY 30-nginx-iep-startup-script.sh /docker-entrypoint.d/30-nginx-iep-startup-script.sh
RUN chmod 775 /docker-entrypoint.d/30-nginx-iep-startup-script.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
