#!/bin/bash
  
cd frontend
npm install
npm run build
cp -r dist/* /var/www/html/

sudo service nginx restart