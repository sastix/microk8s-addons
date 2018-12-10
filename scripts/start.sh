#!/usr/bin/env bash

(cd microk8s-webconsole/server; sudo npm run start:dev &> server.output &)
(cd microk8s-webconsole/ui; npm run start &> ui.output &)

echo "Point your browser at http://localhost:4200"
