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
```