FROM ubuntu:bionic AS builder
USER root
WORKDIR /home/app
RUN mkdir ./ui
RUN mkdir ./common
ADD ./microdash/ui /home/app/ui
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install nodejs
RUN npm install -g yarn
RUN cd /home/app/ui && yarn install
RUN npm install -g @angular/cli@9.0.1
RUN npm -v && node -v && yarn -v
RUN cd /home/app/ui && yarn build --prod

# NGINX
FROM ubuntu:latest AS ship
USER root
RUN apt-get update
RUN apt-get -y install nginx
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/cb
#RUN echo "xyztoken" > /usr/share/nginx/html/cb/token.txt
RUN rm -rf /var/www/html/*
RUN rm /etc/nginx/sites-enabled/default
#COPY ./docker/ui/nginx/nginx.conf /etc/nginx/conf.d/microdash.conf
COPY ./docker/ui/nginx/nginx.conf.template /etc/nginx/conf.d/microdash.conf.template
COPY ./docker/ui/nginx/.htpasswd.template /etc/nginx/.htpasswd.template
COPY ./docker/ui/nginx/docker-entrypoint.sh /
COPY --from=builder /home/app/ui/dist/microk8s-microdash-ui /usr/share/nginx/html
RUN rm -rf /home/app/*
EXPOSE 80
# installing envsubst
RUN apt-get -y install gettext-base
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
