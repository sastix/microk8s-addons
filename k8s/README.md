# Create secret token to be used by MicroDash UI

echo "xyztoken" > token.txt
```
microk8s.kubectl create namespace microdash
microk8s.kubectl create secret generic callback-token --from-file=./token.txt --namespace microdash
microk8s.kubectl get secrets
microk8s.kubectl describe secrets/callback-token
```
