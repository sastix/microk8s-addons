#/usr/bin/env bash

# TODO: This script is WIP

function cmd_detect {
  hash $1 2>/dev/null
}

function run_npm {
  # Will run npm install in the server and ui
  cd $PROJECT_HOME/../microk8s-webconsole/server && npm install
  cd $PROJECT_HOME/../microk8s-webconsole/ui && npm install
}

function install_dependecies {
  #Detect Package Manager and install dependencies

  if cmd_detect apt; then
    # apt package manager
    apt install npm
  elif cmd_detect yum; then
    # yum package manager
    sudo yum install npm
  elif cmd_detect pacman; then
    # pacman package manager
    sudo pacman -S npm
  else
    echo "No package manager detected!"
    exit 2
  fi

  # npm install
  run_npm
}

function start_webconsole {
  # Start the frontend and the backend in background
  echo "Launching backend server..."
  (cd $PROJECT_HOME/../microk8s-webconsole/server; echo $ROOT_PASSWORD | sudo -S npm run start:dev &> server.output &)
  echo "Launching frontend..."
  (cd $PROJECT_HOME/../microk8s-webconsole/ui; npm run start &> ui.output &)

  # Detect the browser and launch the webconsole
  echo "Detecting your browser and launching webconsole..."
  if [ -n "$BROWSER" ]; then
    $BROWSER https://localhost:4200
  else
    echo "No browser found. Point your browser at https://localhost:4200"
  fi
}

PROJECT_HOME="$(pwd)"

SCRIPT_OPTS="$(getopt -o hv: -l start,stop,installdeps --name "$0" -- "$@")"
eval set -- "$SCRIPT_OPTS"

# Get root password
read -p "Root password: " -s ROOT_PASSWORD

while [[ $# -gt 0 ]] ; do
  case $1 in
    --start)
      echo "Starting webconsole."
      start_webconsole
      ;;
    --stop)
      echo "Stopping webconsole."
      # TODO
      ;;
    --installdeps)
      echo "Installing dependencies..."
      install_dependecies
  esac
  shift
done
