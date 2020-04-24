#!/usr/bin/env bash

KUBECTL="microk8s.kubectl"
KUBECTL create namespace microdash

# Create a private key for your user.
openssl genrsa -out microadmin.key 2048
openssl req -new -key microadmin.key -out microadmin.csr -subj "/CN=microadmin/O=microdash"

CA_LOCATION=
openssl x509 -req -in microadmin.csr -CA ${CA_LOCATION}/ca.crt -CAkey ${CA_LOCATION}/ca.key -CAcreateserial -out microadmin.crt -days 99500

CERTS_HOME=/home/
KUBECTL config set-credentials microadmin --client-certificate=/home/employee/.certs/microadmin.crt  --client-key=/home/employee/.certs/microadmin.key
KUBECTL config set-context microadmin-context --cluster=microk8s-cluster --namespace=microdash --user=microadmin

KUBECTL create -f role-microdash-admin.yaml