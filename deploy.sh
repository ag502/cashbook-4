#!/bin/bash

## set path ##

cd /home/ubuntu/workspace/cashbook-4
  
## github ##

git pull

currentCommit=$(git log -1 --format="%H")
lastCommit=$(cat ~/.lastCommit.log 2> /dev/null)
echo $currentCommit > ~/.lastCommit.log

if [ "$currentCommit" == "$lastCommit" ];
then
	echo "commit not changed"
	exit 0
fi

## 빌드 ##
cd frontend
npm install
npm run build
cp -r dist/* /home/ubuntu/www/

cd ../backend

npm install
npm run deploy
