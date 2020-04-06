#/usr/bin/env bash

PROJECT_HOME="$(pwd)"


# commenting out the nodejs proxy server. MicroK8s will expose directly the APIs consumed by MicroDash. Keeping the code
# for future use, in case more feature are needed and must be hosted 'ouside' MicroK8s. Eg a database to keep statistics
# read -p "Root password: " -s ROOT_PASSWORD
# (cd $PROJECT_HOME/../microk8s-webconsole/server; echo $ROOT_PASSWORD | sudo -S npm run start:dev &> server.output &)

(cd $PROJECT_HOME/../microk8s-webconsole/ui; yarn start &> ../../scripts/microdash.log &)

echo "Point your browser at http://localhost:4200"
