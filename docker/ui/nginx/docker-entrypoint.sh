#!/usr/bin/env sh
set -eu

envsubst '${CALLBACK_TOKEN} ${HOST_ACCESS_IP}' < /etc/nginx/conf.d/microdash.conf.template > /etc/nginx/conf.d/microdash.conf

exec "$@"