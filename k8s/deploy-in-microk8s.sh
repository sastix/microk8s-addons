#!/usr/bin/env bash
# Create secret token to be used by MicroDash UI

# the base bath '/var/snap/microk8s/current/' could also be retrieved from $SNAP_DATA
CALLBACK_TOKEN_FILE="/var/snap/microk8s/current/credentials/callback-token.txt"

# If token file already exists and has non zero content, use this, otherwise create a new one.
if [ -f ${CALLBACK_TOKEN_FILE} ] && [ ! -z $(cat $CALLBACK_TOKEN_FILE | sed -r '/^\s*$/d') ]
then
    TOKEN=$(<${CALLBACK_TOKEN_FILE})
    echo "Callback token already exists in file and is: $TOKEN"
else
    # TOKEN=$(cat /dev/urandom | tr -dc 'A-Z0-9' | fold -w 64 | head -n 1)
    TOKEN=$(shuf -zer -n64 {A..Z} {0..9} | sed 's/\x0//g' )
    echo "New callback token created: $TOKEN"
    echo "$TOKEN" > ${CALLBACK_TOKEN_FILE}
fi
# setup the magic ip so pod/container can see host
sudo ifconfig lo:1 10.0.2.2 up

microk8s.kubectl create namespace microdash
microk8s.kubectl delete secret cb-token -n microdash
microk8s.kubectl create secret generic cb-token --from-literal=token.txt="${TOKEN}" --namespace microdash
microk8s.kubectl apply -f microdash.yaml


