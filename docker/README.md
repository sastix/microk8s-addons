# Building docker image

## ui
```
# navigate to project root folder and run
docker build -t 'microdash:1.0' -f docker/ui/ubuntu/Dockerfile .
# or
docker build -t 'microdash:1.0-slim' -f docker/ui/alpine/Dockerfile .
```

## server
```
docker build -t 'microdash-server:1.0' -f docker/server/ubuntu/Dockerfile .
# or
docker build -t 'microdash-server:1.0-slim' -f docker/server/alpine/Dockerfile .
```

# Run docker image

## ui
```
docker run -p 80:80 microdash:1.0
```

## server
```
docker run -p 3000:3000 microdash-server:1.0
```

# Clean unused images
```
docker container prune
docker image prune
```

# Various

monitor:
journalctl -fu snap.microk8s.daemon-cluster-agent

curl -k -v -d '{"callback":"xyztoken"}' -H "Content-Type: application/json" -X POST https://127.0.0.1:25000/cluster/api/v1.0/configure

response: 500 error

we need to add a token
sudo nano /var/snap/microk8s/current/credentials/callback-token.txt

