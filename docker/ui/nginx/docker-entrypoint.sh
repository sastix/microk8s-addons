#!/usr/bin/env sh

if [ -z ${K8S_TOKEN} ]
then
    export SERVICEACCOUNT=/var/run/secrets/kubernetes.io/serviceaccount
    export K8S_TOKEN=$(cat ${SERVICEACCOUNT}/token)
fi

set -eu

envsubst '${CALLBACK_TOKEN} ${HOST_ACCESS_IP} ${K8S_TOKEN}' < /etc/nginx/conf.d/microdash.conf.template > /etc/nginx/conf.d/microdash.conf
envsubst '${K8S_USER} ${K8S_USER_PASS}' < /etc/nginx/.htpasswd.template > /etc/nginx/.htpasswd


exec "$@"