FROM ubuntu:latest AS builder
USER root
WORKDIR /home/app
RUN mkdir ./ui
RUN mkdir ./common
ADD ./microk8s-webconsole/ui /home/app/ui
ADD ./microk8s-webconsole/common /home/app/common
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x  | bash -
RUN apt-get -y install nodejs
RUN cd /home/app/ui && npm install
RUN npm install -g @angular/cli@7.3.9
RUN npm -v && node -v
RUN cd /home/app/ui && ng build --prod

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