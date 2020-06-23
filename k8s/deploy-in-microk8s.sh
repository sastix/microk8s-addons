#!/usr/bin/env bash
# Create secret token to be used by MicroDash UI
set -e
# the base bath '/var/snap/microk8s/current/' could also be retrieved from $SNAP_DATA
CALLBACK_TOKEN_FILE="/var/snap/microk8s/current/credentials/callback-token.txt"
SNAP_DATA="/var/snap/microk8s/current"
MICRODASH_BASIC_AUTH_FILE="${SNAP_DATA}/credentials/.microdash_basic_auth"

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
# sudo ifconfig lo:microk8s 10.0.1.1 up
sudo microk8s.enable host-access

if [ -f "${SNAP_DATA}/var/lock/host-access-enabled" ]
then
  HOST_ACCESS_IP=$(<"${SNAP_DATA}/var/lock/host-access-enabled")
else
  echo "Host-access could not be enabled. Cannot continue.."
  exit
fi

MICRODASH_USER="microadmin"
MICRODASH_PASS=$(openssl passwd -apr1 MicroK8s)

read -ra ARGUMENTS <<<"$1"
read -r user pass <<<$(echo "${ARGUMENTS[@]}" | gawk -F "=" '{print $1 ,$2}')

if [ ! -z "$user" ] && [ ! -z "$pass" ]
then
  read -ra MICRODASH_USER <<< "$user"
  read -ra MICRODASH_PASS <<< $(openssl passwd -apr1 $pass)
fi

# check if nginx basic auth file exists and use that to extract credentials
# sample:
#   user1:$apr1$/woC1jnP$KAh0SsVn5qeSMjTtn0E9Q0
# Hashed password can be created with this command:
#   openssl passwd -apr1 your_password
if [ -f ${MICRODASH_BASIC_AUTH_FILE} ] && [ ! -z $(cat $MICRODASH_BASIC_AUTH_FILE | sed -r '/^\s*$/d') ]
then
    CONTENT=$(<${MICRODASH_BASIC_AUTH_FILE})
    read -r user pass <<<$(echo "${CONTENT[@]}" | gawk -F ":" '{print $1 ,$2}')
    if [ ! -z "$user" ] && [ ! -z "$pass" ]
    then
      read -ra MICRODASH_USER <<< "$user"
      read -ra MICRODASH_PASS <<< "$pass"
    else
      echo -e "\nERROR:\nThe file $MICRODASH_BASIC_AUTH_FILE does not include proper data. File content:\n\n $CONTENT\n"
      echo -e "The username-password pair should be created in NGINX basic auth format using tools like openssl, apache2-utils or httpd-tools."
      echo -e "For example, you can create a password using the command: \n\n openssl passwd -apr1 your_password \n"
      echo -e "and then use it along with a desired username by editing the file and creating content like:\n"
      DUMMY_PASS=$(openssl passwd -apr1 your_password)
      echo -e "user1:$DUMMY_PASS \n"
      exit
    fi
fi

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
$KUBECTL create secret generic cb-token --from-literal=token.txt="${TOKEN}" --from-literal=host_access_ip="${HOST_ACCESS_IP}" --from-literal=microdash_user="${MICRODASH_USER}" --from-literal=microdash_pass="${MICRODASH_PASS}" --namespace microdash
$KUBECTL apply -f microdash.yaml
echo "The username to login from your browser is: $MICRODASH_USER"
echo "password: $MICRODASH_PASS"
echo "MicroDash enabled"
BROWSER_IP=$($KUBECTL get services -n microdash | grep microdash-service | awk '{print $3}')
echo "Point your browser at $BROWSER_IP and when prompted enter user '$MICRODASH_USER' and the selected password. If nothing selected, default is this 'product name'"
