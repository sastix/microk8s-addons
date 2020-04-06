# Building docker image

## ui
```
# navigate to project root folder and run
docker build -t 'sastix/microdash:1.0' -f docker/ui/ubuntu/Dockerfile .
# or
docker build -t 'sastix/microdash:1.0-slim' -f docker/ui/alpine/Dockerfile .
```

## server
```
docker build -t 'sastix/microdash-server:1.0' -f docker/server/ubuntu/Dockerfile .
# or
docker build -t 'sastix/microdash-server:1.0-slim' -f docker/server/alpine/Dockerfile .
```

# Run docker image

## ui
- With magic ip *
```
sudo ifconfig lo:1 10.0.2.2 up
docker run -p 80:80 sastix/microdash:1.0
# or
docker run -p 80:80 sastix/microdash:1.0-slim
```
- With network host on
```
docker run -p 80:80 --network host sastix/microdash:1.0
# map your own conf
docker run -p 80:80 --network host -v /<path-to-project>/microk8s-addons/docker/ui/nginx/nginx.conf:/etc/nginx/conf.d/nginx.conf sastix/microdash:1.0-slim
```

## * magic ip

MicroDash will check with reverse proxy the host ip. When running locally this could be localhost or 127.0.0.1

When in a container, we need the host ip to be something else than localhost. This is the reason of introducing the magic ip: 10.0.2.2

In order to set it run:
```
sudo ifconfig lo:1 10.0.2.2 up
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

