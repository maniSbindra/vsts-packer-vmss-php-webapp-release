#!/bin/bash

cat azuredeploy.parameters.json
azure group deployment create -f azuredeploy.json -e azuredeploy.parameters.json  -g $1 -n rocdashdeploy$2