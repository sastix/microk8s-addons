FROM node:8-slim as builder
WORKDIR /app
RUN mkdir ./ui && mkdir ./common
ADD ./microk8s-webconsole/ui /app/ui
ADD ./microk8s-webconsole/common /app/common
RUN cd /app/ui && npm install
RUN npm install -g @angular/cli@7.3.9
RUN npm -v && node -v
RUN cd /app/ui && ng build --prod
# NGINX
FROM nginx:alpine as ship
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/ui/dist/microk8s-webconsole-ui /usr/share/nginx/html
RUN chown -R 101:101 /usr/share/nginx/html