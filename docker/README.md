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
```
docker run -p 80:80 microdash:1.0
```

In case you want to test with the api running from your host:
```
docker run -p 80:80 --network host microdash:1.0
docker run -p 80:80 --network host -v /<path-to-project>/microk8s-addons/docker/ui/nginx/nginx.conf:/etc/nginx/conf.d/nginx.conf microdash:1.0-slim
```

## server
```
docker run -p 3000:3000 microdash-server:1.0
```

# Clean unused images
```
```