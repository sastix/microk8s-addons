FROM node:12-buster-slim as builder
WORKDIR /app
RUN mkdir ./ui
RUN ls
ADD ./microk8s-webconsole/ui /app/ui
RUN cd /app/ui && yarn
RUN npm install -g @angular/cli@9.0.1
RUN npm -v && node -v && yarn -v
RUN cd /app/ui && yarn build --prod
# NGINX
FROM nginx:alpine as ship
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/ui/dist/microk8s-webconsole-ui /usr/share/nginx/html
RUN chown -R 101:101 /usr/share/nginx/html
