#!/usr/bin/env bash

sudo apt-get install npm
(cd microdash/server; npm install)
(cd microdash/ui; npm install)
