FROM node:12-buster-slim as builder
WORKDIR /app
RUN mkdir ./ui
RUN ls
ADD ./microdash/ui /app/ui
RUN cd /app/ui && yarn
RUN npm install -g @angular/cli@9.0.1
RUN npm -v && node -v && yarn -v
RUN cd /app/ui && yarn build --prod
# NGINX
FROM nginx:alpine as ship
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/cb
#RUN echo "xyztoken" > /usr/share/nginx/html/cb/token.txt
RUN rm /etc/nginx/conf.d/default.conf
#COPY ./docker/ui/nginx/nginx.conf /etc/nginx/conf.d/microdash.conf
COPY ./docker/ui/nginx/nginx.conf.template /etc/nginx/conf.d/microdash.conf.template
COPY ./docker/ui/nginx/docker-entrypoint.sh /
COPY --from=builder /app/ui/dist/microk8s-microdash-ui /usr/share/nginx/html
RUN apk add gettext
ENTRYPOINT ["/docker-entrypoint.sh"]
RUN chown -R 101:101 /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
