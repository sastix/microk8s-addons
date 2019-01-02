#/usr/bin/env bash

PROJECT_HOME="$(pwd)"
read -p "Root password: " -s ROOT_PASSWORD

(cd $PROJECT_HOME/../microk8s-webconsole/server; echo $ROOT_PASSWORD | sudo -S npm run start:dev &> server.output &)
(cd $PROJECT_HOME/../microk8s-webconsole/ui; npm run start &> ui.output &)

echo "Point your browser at http://localhost:4200"
