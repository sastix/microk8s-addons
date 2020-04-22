#!/usr/bin/env sh
set -eu

envsubst '${CALLBACK_TOKEN} ${HOST_ACCESS_IP}' < /etc/nginx/conf.d/microdash.conf.template > /etc/nginx/conf.d/microdash.conf
envsubst '${K8S_USER} ${K8S_USER_PASS}' < /etc/nginx/.htpasswd.template > /etc/nginx/.htpasswd

exec "$@"