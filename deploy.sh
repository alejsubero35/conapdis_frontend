#!/bin/sh
killall node

npm install
echo "Construir proyecto"
npm run build

echo "Ejecutar"
#nohup serve -s dist/ -p 8082 --ssl-cert=/usr/local/directadmin/data/users/filicabh413/domains/filicabh.com.ve.cert  --ssl-key=/usr/local/directadmin/data/users/filicabh413/domains/filicabh.com.ve.key

nohup serve -s dist/ -p 3000 &
