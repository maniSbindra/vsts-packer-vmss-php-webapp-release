### Sample project to demonstrate deployment of PHP web application using VSTS and packer

### Test Deployment commands
* azure group create rockmvmssresgrp westus
* azure group deployment create -f azuredeploy.json -e azuredeploy.parameters-local.json  -g rockmvmssresgrp -n rocvmssdep1