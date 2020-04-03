# Create secret token to be used by MicroDash UI

echo "xyztoken" > token.txt
```
microk8s.kubectl create namespace microdash
microk8s.kubectl create secret generic cb-token --from-file=./token.txt --namespace microdash
microk8s.kubectl -n microdash get secrets
microk8s.kubectl -n microdash describe secrets/cb-token
```
