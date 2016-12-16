#!/bin/bash

echo "************* set environment vars"
export ARM_CLIENT_ID=$1
export ARM_CLIENT_SECRET=$2
export ARM_RESOURCE_GROUP=$3
export ARM_STORAGE_ACCOUNT=$4
export ARM_SUBSCRIPTION_ID=$5
export ARM_TENANT_ID=$6
export ADMIN_USERNAME=$7
export ADMIN_PASSWORD=$8

rm packer-build-output.log

echo "************* execute packer build"
## execute packer build and sendout to packer-build-output file
packer build ./packer-files/phpapp-packer.json 2>&1 | tee packer-build-output.log

 cat azuredeploy.parameters.json

