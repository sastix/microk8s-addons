# Microdash - a MicroK8s dashboard 

[MicroK8s](https://kubernetes.io/) provides a local [Kubernetes](https://kubernetes.io/) that you can manage through the CLI. This project provides Microdash, a web console over the most common operations a developer will need when interacting with MicroK8s.

![Screenshot](images/screenshot.png)

## Requirements

You must have MicroK8s installed and running \*\*:
```
sudo snap install microk8s --edge --classic
```
> \*\* Until this [PR](https://github.com/ubuntu/microk8s/pull/1076) will be merged to [master](https://github.com/ubuntu/microk8s) and released in the next MicroK8s version (maybe v1.19), you have to clone/checkout this [branch](https://github.com/sastix/microk8s/tree/feature/extend-cluster-agent-api) and install MicroK8s manually by following these [instructions](https://github.com/ubuntu/microk8s/blob/master/docs/build.md)
## Deploy MicroDash in MicroK8s 

Under [k8s](k8s) folder you can find the [script](k8s/deploy-in-microk8s.sh) to deploy MicroDash. Open a shell and run:
```
cd k8s
./deploy-in-microk8s.sh
```

Get all namespaces to find the ip:
```
microk8s.kubectl get all -A
```
![Screenshot](images/microdash-ip.png)

Point the browser to this ip, eg:
http://10.152.183.98

## Run in development mode

Firstly create the callback token file to validate against the cluster-agent api running in MicroK8s:
```
sudo echo "xyztoken" >  /var/snap/microk8s/current/credentials/callback-token.txt
```
When in development mode, angular uses the {"callback":"xyztoken"} by default, that is the reason for creating the file above

Prerequisites:
- Node 12 (use NVM)
- Angular 9
- Yarn
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install v12
sudo npm install -g yarn
sudo npm install -g @angular/cli@9.0.1
```

The project uses angular and yarn. In order to run MicroDash at 4200 port run the following from a shell:
```
cd microdash/ui
yarn
yarn start
```

The UI will be available* at http://localhost:4200

**\*Important!!** 
>Angular is using @angular/common/http to make POST requests against the cluster-agent-api at https://127.0.0.1:25000/cluster/api/v1.0 which is under https using a self signed certificate. In order NOT to get the net::ERR_CERT_AUTHORITY_INVALID error in the browser, you have to trust the certificate by opening the swagger page at https://127.0.0.1:25000/swagger  - In Chrome select Advanced > Proceed to 127.0.0.1 (unsafe)

Press Ctr+C to kill the running server in your shell

In case you want to run it as a background service, locate [start.sh](scripts/start.sh) under scripts folder and run it from a shell:
```
cd microdash/ui
yarn
cd ../../scripts
./start.sh
```
You can stop the service by finding the process and kill it. From a shell run:
```
ps -ef | grep "ng serve"
kill <process_id>
```

## Build and run using Docker
In this project you can find 2 Dockerfiles to build the angular code and run from an NGINX container. The [first](docker/ui/ubuntu/Dockerfile) is based on an ubuntu image and the [second](docker/ui/alpine/Dockerfile) on an alpine.

### Building the code:
Navigate to project root folder and run:
```
# Using the ubuntu image:
docker build -t 'sastix/microdash:1.0' -f docker/ui/ubuntu/Dockerfile .

# Using the alpine image:
docker build -t 'sastix/microdash:1.0-slim' -f docker/ui/alpine/Dockerfile .
```
For everything to work smoothly you have to enable the "magic ip" on your host, or run the Docker container having enabled the access to your network host. 

Before running the container, make sure you have created the callback-token file in MicroK8s:
```
sudo echo "xyztoken" > /var/snap/microk8s/current/credentials/callback-token.txt
```
>Dockerized NGINX is exposing the callback-token with a default "xyztoken" value. In case you want to try a different value, connect at the container and update **/usr/share/nginx/html/cb/token.txt** with the preferred value. **DO NOT forget** to update **/var/snap/microk8s/current/credentials/callback-token.txt** with the same value 

### Run the container using the 'magic ip'
Open a shell and run:
```
# magic ip
sudo ifconfig lo:1 10.0.2.2 up
# ubuntu image
docker run -p 80:80 sastix/microdash:1.0
# alpine image
docker run -p 80:80 sastix/microdash:1.0-slim
```

### Run the container using network host

You must map your own NGINX config file (or use existing) through docker volume. 

Use  [docker/ui/nginx/nginx.conf](docker/ui/nginx/nginx.conf) and change:
```
proxy_pass https://10.0.2.2:25000/;
```
to (or your local ip):
```
proxy_pass https://127.0.0.1:25000/;
```
then run:
```
# ubuntu
docker run -p 80:80 --network host -v /<path-to-project>/microk8s-addons/docker/ui/nginx/nginx.conf:/etc/nginx/conf.d/microdash.conf sastix/microdash:1.0
# alpine
docker run -p 80:80 --network host -v /<path-to-project>/microk8s-addons/docker/ui/nginx/nginx.conf:/etc/nginx/conf.d/microdash.conf sastix/microdash:1.0-slim
```


# Links
 - [Kubernetes](https://kubernetes.io/)
 - [MicroK8s project on github](https://github.com/ubuntu/microk8s)
 - [MicroK8s project](https://microk8s.io)

