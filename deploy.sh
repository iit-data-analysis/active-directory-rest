#!/usr/bin/env bash

docker-compose down
git reset --hard
git pull
chmod u+x deploy.sh
bash npm.sh install
docker-compose up -d --build && docker-compose logs --tail 0 -f node
