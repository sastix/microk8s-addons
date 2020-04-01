FROM ubuntu:latest AS builder
USER root
WORKDIR /home/app
RUN mkdir ./ui
RUN mkdir ./common
ADD ./microk8s-webconsole/ui /home/app/ui
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
RUN rm -rf /var/www/html/*
COPY --from=builder /home/app/ui/dist/microk8s-webconsole-ui /var/www/html
#RUN cp -r /home/app/ui/dist/microk8s-webconsole-ui/* /var/www/html/
RUN rm -rf /home/app/*
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
