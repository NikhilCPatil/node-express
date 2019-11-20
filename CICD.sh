#!/bin/bash  
ssh root@0.0.0.0
cd /var/www/html/code/node/node-express/ && git pull origin master
docker kill container_name
docker rmi liquidity/nodeapp
docker build -t liquidity/nodeapp .
docker run -p 3000:3000 -d liquidity/nodeapp

