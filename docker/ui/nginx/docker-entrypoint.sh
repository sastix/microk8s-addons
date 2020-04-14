#!/usr/bin/env sh
set -eu

envsubst '${CALLBACK_TOKEN}' < /etc/nginx/conf.d/microdash.conf.template > /etc/nginx/conf.d/microdash.conf

exec "$@"