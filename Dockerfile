FROM alpine:3.7

RUN mkdir -p /opt/www/api
WORKDIR /opt/www/api

RUN apk update

RUN apk add --no-cache bash  make nodejs nodejs-npm
COPY . /opt/www/api
RUN npm install
RUN npm install babel-cli -g
RUN npm install nodemon -g
ENV NODE_ENV development

RUN rm -rf /var/cache/apk/*
CMD [ "npm", "start" ]
