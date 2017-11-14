FROM    nginx:alpine

# Environmental variables
ENV     USER=root HOME=/tmp

COPY    ./nginx.conf /etc/nginx/conf.d/default.conf
ADD     ./target                  /target
ADD     ./config.js               /config.js
ADD     ./index.html              /index.html
ADD     ./favicon.ico              /favicon.ico
ADD     ./jspm_packages           /jspm_packages
ADD     ./package.json           /package.json


EXPOSE  8000