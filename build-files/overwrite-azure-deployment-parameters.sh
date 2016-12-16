#!/bin/bash

export imageodisk=$(cat packer-build-output.log | grep OSDiskUri: | awk '{print $2}')

echo $imageodisk


 sed -i 's/@@VMUSERNAME@@/'"$ADMIN_USERNAME"'/g' azuredeploy.parameters.json
 sed -i 's/@@VMPASSWORD@@/'"$ADMIN_PASSWORD"'/g' azuredeploy.parameters.json
 sed -i 's|@@IMAGEURI@@|'"$imageodisk"'|g' azuredeploy.parameters.json

cat azuredeploy.parameters.json