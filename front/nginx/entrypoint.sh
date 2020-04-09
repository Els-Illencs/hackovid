#!/bin/sh

envsubst '$PORT' < /container-data/nginx.template.conf > /etc/nginx/nginx.conf

nginx -g "daemon off;"