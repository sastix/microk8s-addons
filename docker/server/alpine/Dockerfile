FROM node:8-slim
WORKDIR /app
RUN mkdir ./server && mkdir ./common
ADD ./microdash/server /app/server
ADD ./microdash/common /app/common
RUN cd /app/server && npm install
RUN npm -v && node -v
CMD ["npm", "run", "start:dev", "--prefix", "/home/app/server"]