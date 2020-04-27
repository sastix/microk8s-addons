#!/usr/bin/env bash

SECRET_NAME=$(microk8s.kubectl get secrets | grep ^default | cut -f1 -d ' ')
K8S_TOKEN=$(microk8s.kubectl describe secret $SECRET_NAME | grep -E '^token' | cut -f2 -d':' | tr -d " ")

sudo ifconfig lo:microk8s 10.0.2.2 up
if [ ! -z $1 ]  &&  [ $1 != '-slim' ]
then
    echo "The only argument supported is '-slim'"
    exit
fi

CMD="docker run -p 80:80 -e CALLBACK_TOKEN=xyztoken -e K8S_TOKEN="${K8S_TOKEN}" -e HOST_ACCESS_IP=10.0.2.2 -e K8S_USER=microadmin -e K8S_USER_PASS=\$apr1\$029KDYcF\$OWgQy3KmUTum5je0T1Ooi1 sastix/microdash:1.0${1}"
echo $CMD

echo $($CMD)
