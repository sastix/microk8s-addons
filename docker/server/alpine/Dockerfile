FROM node:8-slim
WORKDIR /app
RUN mkdir ./server && mkdir ./common
ADD ./microk8s-webconsole/server /app/server
ADD ./microk8s-webconsole/common /app/common
RUN cd /app/server && npm install
RUN npm -v && node -v
CMD ["npm", "run", "start:dev", "--prefix", "/home/app/server"]