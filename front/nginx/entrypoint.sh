#!/bin/sh

envsubst '$PORT' < /nginx-container-data/nginx.template.conf > /etc/nginx/nginx.conf

nginx -g "daemon off;"