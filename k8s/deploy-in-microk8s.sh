#!/usr/bin/env bash
# Create secret token to be used by MicroDash UI
set -e
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
sudo ifconfig lo:microk8s 10.0.1.1 up
KUBECTL="microk8s.kubectl"
CHECK_NAMESPACE=$($KUBECTL get namespaces)
if ! echo $CHECK_NAMESPACE | grep "microdash" >/dev/null
then
    echo "Creating microdash namespace since it does not exist"
    $KUBECTL create namespace microdash
fi

CHECK_SECRET=$($KUBECTL -n microdash get secrets)
if echo $CHECK_SECRET | grep "cb-token" >/dev/null
then
    echo "Delete existing cb-token secret under microdash namespace"
    $KUBECTL delete secret cb-token -n microdash
fi

echo "Creating new cb-token secret under microdash namespace"
$KUBECTL create secret generic cb-token --from-literal=token.txt="${TOKEN}" --namespace microdash
$KUBECTL apply -f microdash.yaml

echo "MicroDash enabled"
