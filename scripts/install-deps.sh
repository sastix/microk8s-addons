#!/usr/bin/env bash

sudo apt-get install npm
(cd microk8s-webconsole/server; npm install)
(cd microk8s-webconsole/ui; npm install)
