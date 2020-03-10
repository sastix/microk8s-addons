FROM ubuntu:latest
USER root
WORKDIR /home/app
RUN mkdir ./server && mkdir ./common
ADD ./microk8s-webconsole/server /home/app/server
ADD ./microk8s-webconsole/common /home/app/common
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x  | bash -
RUN apt-get -y install nodejs
RUN cd /home/app/server && npm install
RUN npm -v && node -v
CMD ["npm", "run", "start:dev", "--prefix", "/home/app/server"]

